'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'Có lỗi xảy ra khi tạo tài khoản.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/account?success=${encodeURIComponent('Tạo tài khoản thành công')}`)
      } catch (_) {
        clearTimeout(timer)
        setError('Có lỗi với thông tin đăng nhập. Vui lòng thử lại.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p>
        {`Đây là nơi khách hàng mới có thể đăng ký và tạo tài khoản mới. Để quản lý tất cả người dùng, `}
        <Link href="/admin/collections/users">đăng nhập vào bảng điều khiển quản trị</Link>
        {'.'}
      </p>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Địa chỉ Email"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        type="password"
        label="Mật khẩu"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Xác nhận Mật khẩu"
        required
        register={register}
        validate={value => value === password.current || 'Mật khẩu không khớp'}
        error={errors.passwordConfirm}
      />
      <Button
        type="submit"
        label={loading ? 'Đang xử lý' : 'Tạo Tài Khoản'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Bạn đã có tài khoản? '}
        <Link href={`/login${allParams}`}>Đăng nhập</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm
