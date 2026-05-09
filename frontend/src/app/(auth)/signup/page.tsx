import React from 'react'

const page = () => {
  const handleSend() =>  {
  }
  return (
    <div>
      <div>
        <p>メールアドレス</p>
        <input type="text" />
      </div>
      <div>
        <p>パスワード</p>
        <input type="text" />
      </div>
      <div>
        パスワード（確認）
        <input type="text" />
      </div>
      <button onClick={()=>handleSend()}>送信</button>
    </div>
  )
}

export default page