import emails from '@/data/emails.json';
import Link from '@/components/Link';
import EmailImage from '@/components/EmailImage';
import Slider from '@/components/Slider';
import ResponsiveImage from '@/components/ResponsiveImage';
import { emailsCount } from '@/config/site';
import CTABannerEmails from '@/components/CTABAnnerEmails';
import clsx from 'clsx';
import { Container } from '@tabler/react';

export const metadata = {
  title: 'Emails Gallery',
  description: 'Tabler Emails is a set of responsive email templates for marketing, transactional and automated emails.',
};

export default function EmailsGalleryPage() {
  return (
    <>
      <section className="section pb-0">
        <Container>
          <div className="section-header">
            <h2 className="section-title section-title-lg">Email templates gallery</h2>
            <p className="section-description">
              See how our emails look. Choose your favorite from among {emailsCount}
              &nbsp;carefully prepared emails.
            </p>
          </div>
        </Container>
      </section>

      {emails.map((email, i) => (
        <section key={email.descriptionShort} className={clsx('section py-6', i % 2 == 1 ? 'section-light' : '')}>
          <Container size="narrow">
            <div className={clsx('row g-6 items-center', i % 2 == 0 ? 'flex-row-reverse' : '')}>
              <div className="col">
                <h3 className="mb-4">{email.descriptionShort}</h3>
                <p>{email.descriptionLong}</p>
              </div>
              <div className="col-5">
                <div>
                  <div className="rounded img-gradient border">
                    <div className="o-hidden ratio-3x4 mx-auto ">
                      <ResponsiveImage src={`/img/tabler-emails/screenshots/${email.screenshot}-full.png`} width={540} height={(email.height / email.width) * 540} className="rounded mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="section">
        <Container>
          <div className="mt-7">
            <CTABannerEmails />
          </div>
        </Container>
      </section>
    </>
  );
}
