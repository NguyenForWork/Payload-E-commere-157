import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      const formData = new FormData(e.target)
      const fullName = formData.get('fullName')
      const email = formData.get('email')
      const phone = formData.get('phone')
      const address = formData.get('address')
      const city = formData.get('city')
      const state = formData.get('state')

      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'object' && product.priceJSON ? product.priceJSON[0]?.price || 0 : 0,
            })),
            fullName,
            email,
            phone,
            address,
            city,
            state,
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting order: ${msg}`)
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h4>THÔNG TIN ĐẶT HÀNG CỦA BẠN</h4>
      {error && <Message error={error} />}
      <div className={classes.fieldGroup}>
        <div className={classes.field}>
          <label htmlFor="fullName">Họ và tên</label>
          <input type="text" id="fullName" name="fullName" required />
        </div>
        <div className={classes.field}>
          <label htmlFor="email">Địa chỉ email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.field}>
          <label htmlFor="phone">Số điện thoại</label>
          <input type="text" id="phone" name="phone" required />
        </div>
      </div>
      <div className={classes.field}>
        <label htmlFor="address">Địa chỉ</label>
        <input type="text" id="address" name="address" required />
      </div>
      <div className={classes.field}>
        <label htmlFor="city">Thành phố</label>
        <input type="text" id="city" name="city" required />
      </div>
      <div className={classes.field}>
        <label htmlFor="state">Bang/Tỉnh</label>
        <input type="text" id="state" name="state" />
      </div>
      <div className={classes.actions}>
        <Button label="Quay về giỏ hàng" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Loading...' : 'Đặt hàng'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      const formData = new FormData(e.target)
      const fullName = formData.get('fullName')
      const email = formData.get('email')
      const phone = formData.get('phone')
      const address = formData.get('address')
      const city = formData.get('city')
      const state = formData.get('state')

      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price: typeof product === 'object' && product.priceJSON ? product.priceJSON[0]?.price || 0 : 0,
            })),
            fullName,
            email,
            phone,
            address,
            city,
            state,
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting order: ${msg}`)
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h4>THÔNG TIN ĐẶT HÀNG CỦA BẠN</h4>
      {error && <Message error={error} />}
      <div className={classes.fieldGroup}>
        <div className={classes.field}>
          <label htmlFor="fullName">Họ và tên</label>
          <input type="text" id="fullName" name="fullName" required />
        </div>
        <div className={classes.field}>
          <label htmlFor="email">Địa chỉ email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.field}>
          <label htmlFor="phone">Số điện thoại</label>
          <input type="text" id="phone" name="phone" required />
        </div>
      </div>
      <div className={classes.field}>
        <label htmlFor="address">Địa chỉ</label>
        <input type="text" id="address" name="address" required />
      </div>
      <div className={classes.field}>
        <label htmlFor="city">Thành phố</label>
        <input type="text" id="city" name="city" required />
      </div>
      <div className={classes.field}>
        <label htmlFor="state">Bang/Tỉnh</label>
        <input type="text" id="state" name="state" />
      </div>
      <div className={classes.actions}>
        <Button label="Quay về giỏ hàng" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Loading...' : 'Đặt hàng'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
