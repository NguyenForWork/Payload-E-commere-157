'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'Có vấn đề trong việc gửi email đặt lại mật khẩu cho bạn. Vui lòng thử lại.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1>Khôi Phục Mật Khẩu</h1>
          <div className={classes.formWrapper}>
            <p>
              {`Vui lòng nhập email của bạn bên dưới. Bạn sẽ nhận được một email với hướng dẫn
              để đặt lại mật khẩu của mình. Để quản lý tất cả người dùng, `}
              <Link href="/admin/collections/users">đăng nhập vào bảng điều khiển quản trị</Link>
              {'.'}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Message error={error} className={classes.message} />
              <Input
                name="email"
                label="Địa Chỉ Email"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Button
                type="submit"
                appearance="primary"
                label="Khôi Phục Mật Khẩu"
                className={classes.submit}
              />
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Yêu cầu đã được gửi</h1>
          <p>Kiểm tra email của bạn để nhận liên kết cho phép bạn đặt lại mật khẩu một cách an toàn.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
