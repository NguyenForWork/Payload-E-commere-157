'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Thanh toán của bạn đã thành công nhưng có lỗi xảy ra khi xử lý đơn hàng của bạn. Vui lòng liên hệ với chúng tôi để giải quyết vấn đề này.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="Xem tài khoản" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Xem tất cả đơn hàng"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Cảm ơn bạn đã đặt hàng!</h1>
          <p>
            {`Đơn hàng của bạn đã được xác nhận. Bạn sẽ nhận được email xác nhận trong thời gian sớm nhất. Mã đơn hàng của bạn là ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button href={`/orders/${orderID}`} label="Xem đơn hàng" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Xem tất cả đơn hàng"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
