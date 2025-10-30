import React, { useState } from 'react';
import axios from 'axios';

export default function InvestorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErr('');
    try {
      const res = await axios.post('/api/investors/login', { email, password });
      // Server should return a secure, httpOnly cookie or a short-lived JWT
      // For demo we simply show success; replace with real session handling (NextAuth recommended)
      alert('Login OK — implement session handling on server for production');
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <div>
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {err && <div style={{ color: 'red', marginTop: 8 }}>{err}</div>}
      <div style={{ marginTop: 12 }}>
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
}
