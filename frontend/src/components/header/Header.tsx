import React from 'react'

const Header = () => {
  return (
    <div className='header-inner'>
      <ul className='header-ul'>
        <li><a href="#">お気に入り</a></li>
        <li><a href="#">カート</a></li>
        <li id='header-logo'><a href="#"><img src="#" alt="" />logo</a></li>
        <li><a href="#">投稿ページ</a></li>
        <li><a href="#">ログイン</a></li>
      </ul>
    </div>

  )
}

export default Header