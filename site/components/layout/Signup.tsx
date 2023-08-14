'use client';

import Link from '@/components/Link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  return (
    <>
      <div className="text-center mb-4">
        <Link href="/" className="mx-auto d-inline-block logo" aria-label="Tabler" />
      </div>
      <form className="card card-md">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create new account</h2>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group input-group-flat">
              <input type="password" className="form-control" placeholder="Password"/>
            </div>
          </div>
          <div className="form-footer">
            <button className="btn btn-primary w-100">Create new account</button>
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
