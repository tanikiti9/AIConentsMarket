import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='header-inner'>
      <ul className='header-ul'>
        <li><Link href="#">お気に入り</Link></li>
        <li><Link href="/cart">カート</Link></li>
        <li id='header-logo'><Link href="#"><img src="#" alt="" />logo</Link></li>
        <li><Link href="#">投稿ページ</Link></li>
        <li><Link href="/signup">ログイン</Link></li>
      </ul>
    </div>
  )
}

export default Header