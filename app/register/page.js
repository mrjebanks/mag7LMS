'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');
      
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
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Create Account</h1>
        {error && <p className="bg-red-500/30 text-red-300 text-center p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required className="form-input" />
          <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required className="form-input" />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="form-input" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="form-input" minLength="6" />
          <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password" required className="form-input" minLength="6"/>
          <button type="submit" className="form-button" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Already have an account? <Link href="/login" className="text-green-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}