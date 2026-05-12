'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/getToken';

const SignUpPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (password !== passwordConfirm) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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
    }
  };

  return (
    <div>
      <h1>新規登録</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <p>ユーザー名</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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