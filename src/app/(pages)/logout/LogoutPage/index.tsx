'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Đăng xuất thành công.')
      } catch (_) {
        setError('Bạn đã đăng xuất.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {`Bạn muốn làm gì tiếp theo?`}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href={`/${productsPage.slug}`}>Bấm vào đây</Link>
                {` để mua sắm.`}
              </Fragment>
            )}
            {` Để đăng nhập lại, `}
            <Link href="/login">bấm vào đây</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
