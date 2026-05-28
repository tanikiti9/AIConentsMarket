'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/getToken';
import Loading from '@/components/Loading';

const SignUpPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('');
    setLoading(true)
    if (password !== passwordConfirm) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || '登録に失敗しました。');
        return;
      }

      setAuth(data.token, data.user);//tokenをstoreに保存
      console.log(data.token);

      router.push('/');//メインページへ移動

    } catch (e) {
      setError('通信エラーが発生しました。');
    } finally{
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div>
      <h1>新規登録</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <p>メールアドレス</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p>パスワード</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <p>パスワード（確認）</p>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default SignUpPage;