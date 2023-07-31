'use client';

import { emailsCount, emailsDownloadUrl, emailsPrice } from '@/config/site';
import Link from '@/components/Link';
import Slider from '@/components/Slider';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function LayoutHeroUiEmails() {
  return (
    <header className="hero pb-8">
      <div className="container">
        <div className="row items-center">
          <div className="md:col-6 text-center md:text-left" data-aos="fade-up">
            <div className="hero-subheader">Tabler Emails</div>
            <h1 className="hero-title">Better email communication, less effort.</h1>
            <p className="hero-description mt-4">{emailsCount} eye-catching, customizable and responsive email templates to improve your email communication. No coding skills needed.</p>

            <div className="mt-6 lg:mt-7">
              <div className="row justify-center md:justify-start">
                <div className="col-auto">
                  <a href={emailsDownloadUrl} className="btn btn-lg btn-primary lemonsqueezy-button">
                    Buy for ${emailsPrice}
                  </a>
                </div>
                <div className="col-auto">
                  <Link href="/emails/gallery" className="btn btn-lg">
                    Browse gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-6" data-aos="fade-up">
            <div className="lg:my-n6">
              <div className="hero-img-side">
                <Slider
                  style={{
                    background: 'url(/img/emails/hero-bg.svg) no-repeat center/contain',
                  }}
                  slides={[
                    <ResponsiveImage src="/img/emails/hero-5.png" className="mx-auto" width="604" height="590" alt="" key="hero-1" priority />,
                    <ResponsiveImage src="/img/emails/hero-1.png" className="mx-auto" width="604" height="590" alt="" key="hero-2" />,
                    <ResponsiveImage src="/img/emails/hero-2.png" className="mx-auto" width="604" height="590" alt="" key="hero-3" />,
                    <ResponsiveImage src="/img/emails/hero-3.png" className="mx-auto" width="604" height="590" alt="" key="hero-4" />,
                    <ResponsiveImage src="/img/emails/hero-4.png" className="mx-auto" width="604" height="590" alt="" key="hero-5" />,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
