import Link from 'next/link';
import Script from 'next/script';

import Icon from '@/components/Icon';

export default function Custom404Page() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="py-6 text-center">
            <img
              src="/img/404.svg"
              alt="404 - not found"
              height={200}
              className="mb-6 mx-auto"
            />

            <div className="section-header">
              <h1 className="section-title section-title-lg">
                Oooops! Page Not Found
              </h1>
              <p className="section-description">
                This page doesn&apos;t exist or was removed!
                <br />
                We suggest you back home
              </p>

              <div className="mt-5">
                <Link href="/" className="btn btn-primary">
                  <Icon name="chevron-left" />
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Script id="plausible">
        {'window.plausible && window.plausible("404",{props:{path:document.location.pathname}})'}
      </Script> */}
    </>
  );
}
