import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('Bạn đã đăng nhập.')}`,
  })

  return (
    <section className={classes.login}>
      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>Chào mừng</h3>
            <Image src="/footer1.png" alt="hand" width={30} height={30} />
          </div>

          <p>Vui lòng đăng nhập tại đây</p>

          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Đăng Nhập',
  description: 'Đăng nhập hoặc tạo tài khoản để bắt đầu.',
  openGraph: mergeOpenGraph({
    title: 'Đăng Nhập',
    url: '/login',
  }),
}
