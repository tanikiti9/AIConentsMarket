import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      ログイン
      <div>ユーザーネーム</div>
      <input 
      type="text"
      value={name}
      onChange{() => setName()}
      />
      <div>パスワード</div>
      <input type="text" />
      <Link href='/signup'>新規登録</Link>
    </div>
  )
}

export default page