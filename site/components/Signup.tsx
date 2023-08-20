'use client';

import Link from '@/components/Link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: '', email: '', password: '' });

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: '/' });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };  

  return (
    <>
      <div className="text-center mb-4">
        <Link href="/" className="mx-auto d-inline-block logo" aria-label="Tabler" />
      </div>
      <form onSubmit={onSubmit} className="flex-column card card-md">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create new account</h2>
          {
            error && 
            <p className="text-center" style={{color: 'red'}}>{error}</p>
          } 
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              required
              type="name" 
              name="name" 
              value={formValues.name}
              onChange={handleChange}         
              className="form-control" 
              placeholder="Name"
            />
          </div>                   
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}              
              className="form-control" 
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group input-group-flat">
              <input 
                type="password" 
                name="password"
                value={formValues.password}
                onChange={handleChange}                 
                className="form-control" 
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-footer">
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'loading...' : 'Create new account'}
            </button>
          </div>
        </div>
      </form>
      <div className="text-center text-secondary mt-3">
        Already have account?
        <a className="ml-2" onClick={() => router.push('/api/auth/signin')}>
        Sign in</a>
      </div>
    </>
  );
}
