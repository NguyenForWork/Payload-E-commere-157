import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
    <Gutter className={classes.recoverPassword}>
      <RecoverPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Khôi Phục Mật Khẩu',
  description: 'Nhập địa chỉ email của bạn để khôi phục mật khẩu.',
  openGraph: mergeOpenGraph({
    title: 'Khôi Phục Mật Khẩu',
    url: '/recover-password',
  }),
}
