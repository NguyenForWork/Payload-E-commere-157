import React from 'react';
import Link from 'next/link';

import { Footer as FooterType } from '../../../payload/payload-types';
import { fetchFooter, fetchGlobals } from '../../_api/fetchGlobals';
import { ThemeSelector } from '../../_providers/Theme/ThemeSelector';
import { Gutter } from '../Gutter';
import { CMSLink } from '../Link';

import classes from './index.module.scss';

export async function Footer() {
  let footer: FooterType | null = null;

  try {
    footer = await fetchFooter();
  } catch (error) {
    // Xử lý lỗi
  }

  const navItems = footer?.navItems || [];

  return (
    <footer className={classes.footer}>
      <Gutter className={classes.wrap}>
        <div className={classes.container}>
        
          <div className={classes.column}>
            <h2 className={classes.heading}>CHỌN PHONG CÁCH CỦA BẠN</h2>
            <p className={classes.content}>Điểm đến lý tưởng cho những tín đồ yêu thích phong cách và sự cá tính. Với đa dạng các mẫu mã từ trang phục công sở đến đồ dạo phố, shop luôn cập nhật những xu hướng mới nhất, giúp khách hàng tỏa sáng ở mọi nơi.</p>
            <div className={classes.icons}>
              <img src="/webicom.png" alt="Icon 1" className={classes.icon} />
              <img src="/mailicon.png" alt="Icon 2" className={classes.icon} />
              <img src="/phoneicon.png" alt="Icon 3" className={classes.icon} />
              <img src="/fbicon.png" alt="Icon 4" className={classes.icon} />
            </div>
          </div>
          <div className={classes.Infor}>
          <h2 className={classes.heading}>THÔNG TIN</h2>
          <p className={classes.heading}>- Hotline: 19001000</p>
          <p className={classes.heading}>- Địa chỉ: Binh Thanh - HCM</p>
          <p className={classes.heading}>- Facbook: ABC STORE</p>
          </div>
          <div className={classes.column}>
            <img src="/Footer2.png" alt="Image 1" />
          </div>
        </div>
        
      </Gutter>
    </footer>
  );
}
