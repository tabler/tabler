import HeroEmails from '@/components/layout/hero/UiEmails';
import CTABannerEmails from '@/components/CTABAnnerEmails';
import Link from '@/components/Link';
import SectionDivider from '@/components/SectionDivider';
import Features from '@/components/Features';
import Shape from '@/components/Shape';
import ResponsiveImage from '@/components/ResponsiveImage';
import React from 'react';
import Slider from '@/components/Slider';

export const metadata = {
  title: '54 eye-catching, customizable and responsive email templates',
  description: 'Tabler Emails is a set of responsive email templates for marketing, transactional and automated emails.',
};

const EmailsFeatures1 = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row xl:g-7">
          <div className="lg:col-6">
            <ResponsiveImage
              src="/img/tabler-emails/features/emails.png"
              width="564"
              height="549"
              className="mx-auto"
            />
          </div>
          <div className="lg:col-6 d-flex flex-column items-center">
            <div className="section-header w-100">
              <h4 className="section-title text-center lg:text-left">Promote your brand the right way</h4>
            </div>

            <div className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="0">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="target-arrow" />
                  </div>
                  <div className="col">
                    <h3>Achieve your marketing goals</h3>
                    <p className="text-muted m-0">
                      Prepare engaging email campaigns and newsletters, keep your recipients up to date with the latest
                      news, let them know about their order status or send out customer satisfaction surveys. Our set of
                      emails will help you with all that and much more!
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="150">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="brush" />
                  </div>
                  <div className="col">
                    <h3>Personalization is key</h3>
                    <p className="text-muted m-0">
                      Customize the templates to make them suitable for your target group. You can change every element
                      as you wish, including the background, colors, icons, spacers and images. And if you want to
                      present your data in an attractive way, make use of advanced reports, charts or progress bars.
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="device-mobile" />
                  </div>
                  <div className="col">
                    <h3>Great quality with little effort</h3>
                    <p className="text-muted m-0">
                      More than 50% of emails today are open on mobile devices, so we’ve made sure our templates look
                      great on any device and screen size. They are fully responsive and mobile-ready, helping you take
                      care of great user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EmailsFeatures2 = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row xl:g-7">
          <div className="lg:col-6 d-flex flex-column items-center">
            <div className="section-header w-100">
              <h4 className="section-title text-center lg:text-left">
                Focus on your brand and we’ll take care of the rest
              </h4>
            </div>
            <div className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="0">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="brand-bootstrap" />
                  </div>
                  <div className="col">
                    <h3>Bootstrap-inspired design</h3>
                    <p className="text-muted m-0">
                      Based on Bootstrap and Material Design principles, our email templates are responsive and meet the
                      highest quality standards. Thanks to that, you can be sure the layout will look perfect in every
                      email client and on any device.
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="150">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="layout-dashboard" />
                  </div>
                  <div className="col">
                    <h3>No coding skills needed</h3>
                    <p className="text-muted m-0">
                      Our templates are ready-to-use. You don’t need coding skills to prepare eye-catching emails and
                      boost your brand awareness. Have a basic knowledge of HTML? Design your own email using the
                      elements from different templates and make it even more customized.
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="row">
                  <div className="col-auto">
                    <Shape size="md" color="primary" icon="tools" />
                  </div>
                  <div className="col">
                    <h3>Reliable solution</h3>
                    <p className="text-muted m-0">
                      Tabler Emails have been tested across more than 90 email clients and many devices. Thanks to that,
                      instead of worrying about any technical issues, you can focus on making the content of your
                      message exceptional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-6">
            <ResponsiveImage src="/img/tabler-emails/features/stats.png" width="564" height="762" className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

const EmailsGallery = () => {
  return (
    <div className="section section-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">See what you will get</h2>
          <p className="section-description">Browse our selection of emails and see how they look.</p>
        </div>
      </div>

      <div className="expandable expandable-emails" />

      <div className="container">
        <div className="text-center mt-2">
          <Link href="/emails/gallery" className="btn btn-lg">
            Browse emails gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

const EmailsDark = () => {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="row xl:g-7 items-center">
          <div className="lg:col-6">
            <ResponsiveImage
              src="/img/tabler-emails/features/dark.png"
              width="564"
              height="585"
              key="img-1"
              className="mx-auto"
            />
          </div>
          <div className="lg:col-6">
            <div className="section-header text-left">
              <h2 className="section-title">Dark mode? No problem!</h2>
              <div className="section-description">
                <p>
                  Dark mode is a darker color palette for low-light or nighttime environments. This inverted color
                  scheme uses light typography, UI elements and icons on a dark background - and is one of the hottest
                  trends in digital design in recent years. If your subscribers are making a conscious decision to view
                  Dark Mode emails, it&apos;s best to respect that!
                </p>
                <p>
                  Each email in Tabler Emails is available in two color versions: light and dark. It&apos;s up to you
                  which version suits your branding better!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <CTABannerEmails />
        </div>
      </div>
    </section>
  );
};

const EmailsKickItOff = () => {
  return (
    <section className="section section-sm section-light">
      <div className="container">
        <div className="row text-center">
          <div className="md:col" data-aos="fade-up" data-aos-delay={0}>
            <Shape placeholder={1} size="md" className="mb-2" color="primary" />
            <div>Choose one of 54 email templates</div>
          </div>
          <div className="md:col" data-aos="fade-up" data-aos-delay={150}>
            <Shape placeholder={2} size="md" className="mb-2" color="primary" />
            <div>Add your own content to customize it</div>
          </div>
          <div className="md:col" data-aos="fade-up" data-aos-delay={300}>
            <Shape placeholder={3} size="md" className="mb-2" color="primary" />
            <div>Send it using one of the most popular email sending systems</div>
          </div>
        </div>

        {/*<div className="mt-5 text-center">*/}
        {/*  <a href="#" className="btn btn-primary">Buy now for ${emailsPrice}</a>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default function EmailsPage() {
  const features = [
    {
      icon: 'devices',
      title: 'Mobile-optimized',
      description:
        'Our email templates are fully responsive, so you can be sure they will look great on any device and screen size.',
    },
    {
      icon: 'mailbox',
      title: 'Compatible with 90+ email clients',
      description:
        'Tested across 90+ email clients and devices, Tabler emails will help you make your email communication professional and reliable.',
    },
    {
      icon: 'palette',
      title: 'Unique, minimal design',
      description:
        'Draw recipients’ attention with beautiful, minimal email designs based on Bootstrap and Material Design principles.',
    },
  ];

  return (
    <>
      <HeroEmails />
      <section className="section section-sm section-light">
        <SectionDivider />
        <div className="container">
          <Features list={features} />
        </div>
      </section>

      <EmailsFeatures1 />
      <EmailsKickItOff />
      <EmailsFeatures2 />
      <EmailsGallery />
      <EmailsDark />
    </>
  );
}
