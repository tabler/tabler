'use client';

import Link from '@/components/Link';
import { useSearchParams, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
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
      <div className="flex-column card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          {
            error && 
            <p className="text-center" style={{color: 'red'}}>{error}</p>
          }
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input 
                required
                type="email" 
                name="email"
                value={formValues.email}
                onChange={handleChange}                
                className="form-control" 
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
              </label>
              <div className="input-group input-group-flat">
                <input
                  required
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}                  
                  className="form-control"
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'loading...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
        <div className="hr-text">or</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <a onClick={() => signIn('github', { callbackUrl })} className="btn w-100">
                <Icon name="brand-github"/>
                Login with Github
              </a>
            </div>
            <div className="col">
              <a onClick={() => signIn('google', { callbackUrl })} className="btn w-100">
                <Icon name="brand-google"/>
                Login with Google
              </a>
            </div>            
          </div>       
        </div>
      </div>
      <div className="text-center text-secondary mt-3">
        Don't have account yet? 
        <a className="ml-2" onClick={() => router.push('/signup')}>
          Sign up
        </a>
      </div>
    </>
  );
}
