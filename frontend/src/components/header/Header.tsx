'use client'
import React from 'react'
import Link from 'next/link'
import InputField from './InputField'
import { useAuthStore } from '@/store/getToken'
import { useCartStore } from '@/store/cartStore'

const Header = () => {
  const token = useAuthStore((state) => state.token)
  const cartCount = useCartStore((state) => state.cartItems.length)

  return (
    <div className='header-inner'>
      <ul className='header-ul'>
        <li><Link href="#">お気に入り</Link></li>
        <li>
          <Link href="/cart" style={{ position: 'relative', display: 'inline-block' }}>
            カート
            {cartCount > 0 && (
              <span className='countIcon'>
                {cartCount}
              </span>
            )}
          </Link>
        </li>
        <li id='header-logo'><Link href="#"><img src="#" alt="" />logo</Link></li>
        <li id='inputfield'><InputField /></li>
        <li><Link href="#">投稿ページ</Link></li>
        <li>
          {token
            ? <Link href="/mypage">マイページ</Link>
            : <Link href="/signin">ログイン</Link>
          }
        </li>
      </ul>
    </div>
  )
}

export default Header