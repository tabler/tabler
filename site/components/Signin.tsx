'use client';

import Link from '@/components/Link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { signIn } from 'next-auth/react';

export default function Signin() {
  const router = useRouter();'/';

  const handleLogin = async (provider: 'github' | 'google'): Promise<void> => {
    await signIn(provider, {callbackUrl: '/'});
  };

  return (
    <>
      <div className="text-center mb-4">
        <Link href="/" className="mx-auto d-inline-block logo" aria-label="Tabler" />
      </div>
      <div className="flex-column card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="your@email.com"/>
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
              </label>
              <div className="input-group input-group-flat">
                <input type="password" className="form-control" placeholder="Your password"/>
              </div>
            </div>
            <div className="form-footer">
              <button className="btn btn-primary w-100">Sign in</button>
            </div>
          </form>
        </div>
        <div className="hr-text">or</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <a onClick={() => handleLogin('github')} className="btn w-100">
                <Icon name="brand-github"/>
                Login with Github
              </a>
            </div>
            <div className="col">
              <a onClick={() => handleLogin('google')} className="btn w-100">
                {/* <Icon name="brand-google"/> */}
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
