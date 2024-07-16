import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Đặt Lại Mật Khẩu</h1>
      <p>Vui lòng nhập mật khẩu mới bên dưới.</p>
      <ResetPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Đặt Lại Mật Khẩu',
  description: 'Nhập mật khẩu mới.',
  openGraph: mergeOpenGraph({
    title: 'Đặt Lại Mật Khẩu',
    url: '/reset-password',
  }),
}
