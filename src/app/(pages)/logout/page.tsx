import React from 'react'
import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { LogoutPage } from './LogoutPage'

import classes from './index.module.scss'

export default async function Logout() {
  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    // khi triển khai mẫu này trên Payload Cloud, trang này cần được xây dựng trước khi các API hoạt động
    // vì vậy hãy nuốt lỗi ở đây và chỉ đơn giản hiển thị trang với dữ liệu dự phòng nếu cần thiết
    // trong sản xuất bạn có thể muốn chuyển hướng đến trang 404 hoặc ít nhất là ghi lại lỗi ở đâu đó
    // console.error(error)
  }

  return (
    <Gutter className={classes.logout}>
      <LogoutPage settings={settings} />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Đăng xuất',
  description: 'Bạn đã đăng xuất.',
  openGraph: mergeOpenGraph({
    title: 'Đăng xuất',
    url: '/logout',
  }),
}
