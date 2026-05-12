'use client'
import { useAuthStore } from '@/store/getToken';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignInpage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'メールアドレスまたはパスワードが違います');
        return;
      }

      setAuth(data.token, data.user);

      router.push('/');
    } catch (e) {
      setError('通信エラーが発生しました')
    }

  }
  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>ユーザーネーム</div>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>パスワード</div>
      <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>送信</button>

    </div>
  )
}

export default SignInpage