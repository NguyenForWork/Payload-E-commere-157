import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Không thể tạo tài khoản mới khi đang đăng nhập. Vui lòng đăng xuất và thử lại.',
    )}`,
  })

  return (
    <Gutter className={classes.createAccount}>
      <h1>Tạo Tài Khoản</h1>
      <RenderParams />
      <CreateAccountForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Tài Khoản',
  description: 'Tạo tài khoản hoặc đăng nhập vào tài khoản hiện có của bạn.',
  openGraph: mergeOpenGraph({
    title: 'Tài Khoản',
    url: '/account',
  }),
}
