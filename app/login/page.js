'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // FIX: Include credentials (cookies) in the request
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Login failed');
      
      document.cookie = `token=${data.token}; path=/; max-age=18000; samesite=lax`;
      router.push('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="form-container">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Welcome Back</h1>
        {error && <p className="bg-red-500/30 text-red-300 text-center p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="form-input" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="form-input" />
          <button type="submit" className="form-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
         <p className="text-center mt-4 text-gray-400">
          Don't have an account? <Link href="/register" className="text-green-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
