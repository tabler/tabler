'use client';

import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function EntryHeader() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="container">
        <nav className="row items-center">
          <div className="col-auto">
            <div className="d-block">
              <div className="navbar">
                <div className="navbar-item">
                  <a 
                    className="btn" 
                    onClick={() => router.push('/')}
                  >
                    <Icon name="chevron-left"/>
                    Back
                  </a>
                </div>
              </div> 
            </div>
          </div>
        </nav>
      </div>
    </header> 
  );
}
