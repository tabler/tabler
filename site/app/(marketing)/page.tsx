import React from 'react';
import Link from 'next/link';
import questions from '@/data/faq.json';

import { componentsCount, iconsUrl } from '@/config/site';
import Features from '@/components/Features';
import ResponsiveImage from '@/components/ResponsiveImage';
import SectionDivider from '@/components/SectionDivider';
import Shape from '@/components/Shape';
import Testimonials from '@/components/layout/Testimonials';
import TestimonialsShare from '@/components/layout/TestimonialsShare';
import HeroUi from '@/components/layout/hero/Ui';
import { sponsors } from '@/config/sponsors';

export const metadata = {
  title: 'Premium dashboard template with responsive and high quality UI',
  description: 'Tabler comes with tons of well-designed components and features. Start your adventure with Tabler and make your dashboard great again. For free!',
};

const benefits = [
  'Fully responsive',
  'Based on Bootstrap 5',
  'Built with Sass',
  'Detailed documentation',
  'MIT license',
  'Customizable',
  `${componentsCount}+ UI components`,
  'Multiple layouts',
  'Dark mode',
  'Premium vector icons',
];


const FAQ = () => {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="row xl:g-6">
          <div className="md:col-4" data-aos="fade-up">
            <div className="section-header text-left sticky-top">
              <div className="section-title">Frequently asked questions</div>
              <p className="section-description">
                Can’t find the answer you’re looking for? Reach out to our
                customer support team.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="space-y-5">
              {questions.map((question, i) => (
                <div data-aos="fade-up" data-aos-delay={i * 150} key={i}>
                  <div className="h3 mb-1">{question.question}</div>
                  <div className="text-muted">{question.answer}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Link href="/faq" className="btn">
                Read more questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Section title</h3>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col">
                  <div className="card-body h-100 d-flex flex-column pr-0">
                    <div className="h-subheader text-primary">Tabler Icons</div>
                    <h3 className="section-title mb-4">
                      Brilliant Toolkit to Build Nextgen Website Faster.
                    </h3>
                    <div className="text-muted markdown">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Illo perferendis, repellat! Asperiores ducimus
                        esse nobis quaerat sed! Delectus eius illum incidunt
                        minus neque, quos ratione reiciendis voluptatum. Odio
                        quia, similique.
                      </p>
                    </div>
                    <div className="mt-auto pt-5">
                      <div className="btn-list">
                        <a
                          href={iconsUrl}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          Browse icons
                        </a>
                        <Link href="/icons" className="btn">
                          More info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="ratio ratio-1x1 rounded-right"
                    style={{
                      backgroundColor: '#fff',
                      backgroundImage: 'url(/img/tabler/icons-bg.png)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col">
                  <div className="card-body h-100 d-flex flex-column pr-0">
                    <div className="h-subheader text-primary">
                      Tabler Emails
                    </div>
                    <h3 className="section-title mb-4">
                      Brilliant Toolkit to Build Nextgen Website Faster.
                    </h3>
                    <div className="text-muted markdown">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Illo perferendis, repellat! Asperiores ducimus
                        esse nobis quaerat sed! Delectus eius illum incidunt
                        minus neque, quos ratione reiciendis voluptatum. Odio
                        quia, similique.
                      </p>
                    </div>
                    <div className="mt-auto pt-5">
                      <div className="btn-list">
                        <a href="#" className="btn btn-primary">
                          Buy emails for $29
                        </a>
                        <Link href="/icons" className="btn">
                          More info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="ratio ratio-1x1 rounded-right"
                    style={{
                      backgroundColor: '#fff',
                      backgroundImage: 'url(/img/tabler/icons-bg.png)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sponsors = () => {
  return (
    <div className="section section-light pt-6 pb-5">
      <SectionDivider />
      <div className="container img-overlap-padding text-center">
        <div className="mb-6">
          <h2 className="h4 font-normal text-muted mb-6">The project was made possible thanks to wonderful sponsors:</h2>

          <div className="row gx-6 md:gx-7 gy-4 items-center justify-center">
            {sponsors.map((sponsor, i) => (
              <div className="col-auto" key={i}>
                <a href={sponsor.url} className="link-brand" dangerouslySetInnerHTML={{ __html: sponsor.logo }} target="_blank" rel="nofollow"></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function HomePage() {
  const features = [
    {
      icon: 'brand-github',
      title: 'Free and open source',
      description:
        'A big choice of free UI elements and layouts in one efficient, open source solution',
    },
    {
      icon: 'brand-bootstrap',
      title: 'Based on Bootstrap 5',
      description:
        'Based on the latest version of Bootstrap, Tabler is a UI Kit of the future',
    },
    {
      icon: 'brand-html5',
      title: 'Modern design',
      description:
        'Beautiful, fully responsive UI elements that will make your design modern and user-friendly',
    },
  ];

  const highlighCode = `<div className="col" data-aos="fade-up">
  <h2 className="section-title">
    Loving Tabler? Get to know our set of {iconsCount}&nbsp;free vector icons!
  </h2>
  <p className="section-description">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ex facere impedit nostrum
    obcaecati. Ipsam, magnam nam nihil quisquam repellendus tempora. Dicta dignissimos ex laudantium
    reiciendis sapiente ut voluptate voluptatibus?
  </p>

  <div className="mt-5">
    <Link href="/icons" className="btn">
      Read more about icons
    </Link>
  </div>
</div>`;

  return (
    <>
      {/*<Modal />*/}
      <HeroUi />

      <Sponsors />

      {/* <div className="section section-light pt-6 pb-6">
        <SectionDivider />
        <div className="container img-overlap-padding">
          <Features list={features} />
        </div>
      </div> */}

      <section className="section" id="features">
        <div className="container">
          <div className="row items-center">
            <div className="lg:col-6" data-aos="fade-up">
              <div className="section-header w-100">
                <h2 className="section-title text-center lg:text-left">Benefit from Tabler’s top-notch features</h2>
              </div>

              {/*<p className="section-description mb-5">*/}
              {/*  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur*/}
              {/*  deleniti dicta, earum eligendi exercitationem itaque molestias nobis non optio perspiciatis*/}
              {/*  placeat possimus praesentium rerum tempora tempore totam vel. Autem, repudiandae!*/}
              {/*</p>*/}

              <div className="row">
                {benefits.map((benefit, i) => (
                  <div className="sm:col-6 md:col-4 lg:col-6" key={i}>
                    <Shape icon="check" color="green" className="mr-3" size="sm" rounded />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-6" data-aos="fade-up">
              <ResponsiveImage src="/img/tabler/features/charts.png" width="510" height="524" className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Multiple Demos</h2>
            <p className="section-description">6 Pre-built layout options to cater needs of modern web applications. Ready-to-use UI elements enable to develop modern web application with great speed</p>
          </div>
          <div className="row" data-aos-id-blocks-previews>
            <div className="col-6 md:col-4">
              <a href="https://preview.tabler.io?theme=light" className="d-block text-center link text-reset" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks-previews]" data-aos-delay={0} target="_blank" rel="noopener noreferrer">
                <ResponsiveImage src="/img/tabler/preview.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">Modern dashboard</div>
              </a>
            </div>
            <div className="col-6 md:col-4">
              <a href="https://preview.tabler.io?theme=dark" className="d-block text-center link text-reset" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks-previews]" data-aos-delay={150} target="_blank" rel="noopener noreferrer">
                <ResponsiveImage src="/img/tabler/preview-dark.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">Dark mode</div>
              </a>
            </div>
            <div className="col-6 md:col-4">
              <a
                href="https://preview.tabler.io/layout-vertical.html?theme=light"
                className="d-block text-center link text-reset"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks-previews]"
                data-aos-delay={300}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ResponsiveImage src="/img/tabler/preview-sidebar.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">With sidebar navigation</div>
              </a>
            </div>
            <div className="col-6 md:col-4">
              <a
                href="https://preview.tabler.io/layout-navbar-overlap.html?theme=light"
                className="d-block text-center link text-reset"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks-previews]"
                data-aos-delay={450}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ResponsiveImage src="/img/tabler/preview-navbar-overlap.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">With overlap navbar</div>
              </a>
            </div>
            <div className="col-6 md:col-4">
              <a
                href="https://preview.tabler.io/layout-vertical-transparent.html?theme=light"
                className="d-block text-center link text-reset"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks-previews]"
                data-aos-delay={600}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ResponsiveImage src="/img/tabler/preview-sidebar-transparent.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">With transparent navigation</div>
              </a>
            </div>
            <div className="col-6 md:col-4">
              <a
                href="https://preview.tabler.io/layout-rtl.html?theme=light"
                className="d-block text-center link text-reset"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks-previews]"
                data-aos-delay={750}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ResponsiveImage src="/img/tabler/preview-rtl.png" width="389" height="243" className="mx-auto rounded link-img" />
                <div className="mt-3">RTL mode</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Create a perfect interface. Make your life easier.</h2>
          </div>

          <div className="row items-center">
            <div className="lg:col-6" data-aos="fade-up">
              <ResponsiveImage src="/img/tabler/features/forms.png" width={510} height={524} className="mx-auto" />
            </div>
            <div className="lg:col-6">
              <div className="space-y-5">
                <div data-aos="fade-up" data-aos-delay="0">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="primary" icon="tools" />
                    </div>
                    <div className="col">
                      <h3>Designed with users in mind</h3>
                      <p className="text-muted m-0">
                        Tabler is fully responsive and compatible with all modern browsers. Thanks to its modern, user-friendly design you can create a fully functional interface that users will love. Every UI element has been created with
                        attention to detail to make your interface beautiful!
                      </p>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="150">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="primary" icon="brand-bootstrap" />
                    </div>
                    <div className="col">
                      <h3>Built for developers</h3>
                      <p className="text-muted m-0">
                        Having in mind what it takes to write high-quality code, we want to help you speed up the development process and keep your code clean. Based on Bootstrap 5, Tabler is a cutting-edge solution, compatible with all
                        modern browsers and fully responsive.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="300">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="primary" icon="paint" />
                    </div>
                    <div className="col">
                      <h3>Fully customizable</h3>
                      <p className="text-muted m-0">You can easily customize the UI elements to make them fit the needs of your project. And don’t worry if you don’t have much experience - Tabler is easy to get started!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Dark theme whenever you need it ✨</h2>
          </div>

          <div className="row items-center">
            <div className="lg:col-6">
              <div className="space-y-5">
                <div data-aos="fade-up" data-aos-delay="0">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="white" icon="sun-moon" />
                    </div>
                    <div className="col">
                      <h3>Change default variant when you need</h3>
                      <p className="text-muted m-0">
                        Tabler is a beautiful dashboard that comes in 2 versions: Dark and Light Mode. If you are looking for a tool to manage and visualize data about your business, this dashboard is the thing for you. It combines colors
                        that are easy on the eye, spacious cards, beautiful typography, and graphics.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="150">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="white" icon="tools" />
                    </div>
                    <div className="col">
                      <h3>All components available in dark mode</h3>
                      <p className="text-muted m-0">Tabler contains a vast collection of assorted reusable dark UI components, page layouts, charts, tables, UI elements, and icons.</p>
                    </div>
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="300">
                  <div className="row">
                    <div className="col-auto">
                      <Shape size="md" color="white" icon="paint" />
                    </div>
                    <div className="col">
                      <h3>A lot of reasons why dark theme are used widely</h3>
                      <p className="text-muted m-0">
                        Dark mode saves battery life and can reduce eye fatigue in low-light conditions. The high contrast between text and background reduces eye fatigue, and the dark screen helps you focus your eyes longer and helps your
                        brain keep more attention on the screen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-6" data-aos="fade-up">
              <ResponsiveImage src="/img/tabler/features/dark.png" width={510} height={524} className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by hundreds</h2>
            <p className="section-description">Our Users send us bunch of smilies with our services, and we love them 😍</p>
          </div>

          <div className="expandable">
            <Testimonials limit={10} />
          </div>

          <TestimonialsShare />
        </div>
      </section>

      {/*<section className="section section-light">*/}
      {/*  <div className="container">*/}
      {/*    <div className="row items-center">*/}
      {/*      <div className="col" data-aos="fade-up">*/}
      {/*        <ResponsiveImage*/}
      {/*            src="/img/features/code.png"*/}
      {/*            width={510}*/}
      {/*            height={276}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="col" data-aos="fade-up">*/}
      {/*        <h2 className="section-title">*/}
      {/*          Loving Tabler? Get to know our set of {iconsCount}&nbsp;free vector icons!*/}
      {/*        </h2>*/}
      {/*        <p className="section-description">*/}
      {/*          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ex facere impedit nostrum*/}
      {/*          obcaecati. Ipsam, magnam nam nihil quisquam repellendus tempora. Dicta dignissimos ex laudantium*/}
      {/*          reiciendis sapiente ut voluptate voluptatibus?*/}
      {/*        </p>*/}

      {/*        <div className="mt-5">*/}
      {/*          <Link href="/icons" className="btn">*/}
      {/*            Read more about icons*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<section className="section">*/}
      {/*  <div className="container text-center">*/}
      {/*    <blockquote className="font-h2 lh-h2 mb-5 font-medium">*/}
      {/*      “UI Prep has been instrumental in our agency work. UI Prep helps us start at 60% instead of 0%. It’s comprehensive, organized, and very*/}
      {/*      thoughtfully designed. I could not recommend this more.”*/}
      {/*    </blockquote>*/}

      {/*    <div>*/}
      {/*      <span className="avatar avatar-xl" style={{ backgroundImage: "url(/img/authors/codecalm.jpg)"}} />*/}
      {/*    </div>*/}
      {/*    <div className="h4">Jon Moore</div>*/}
      {/*    <div className="text-muted">Principal Product Designer at Innovate map</div>*/}
      {/*    <div>*/}
      {/*      <Icon name="star" filled color="yellow" />*/}
      {/*      <Icon name="star" filled color="yellow" />*/}
      {/*      <Icon name="star" filled color="yellow" />*/}
      {/*      <Icon name="star" filled color="yellow" />*/}
      {/*      <Icon name="star" filled color="yellow" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<section className="section section-light">*/}
      {/*  <div className="container">*/}
      {/*    <div className="row items-center">*/}
      {/*      <div className="col-6" data-aos="fade-up">*/}
      {/*        <h2 className="section-title">*/}
      {/*          Loving Tabler? Get to know our set of {iconsCount}&nbsp;free vector icons!*/}
      {/*        </h2>*/}
      {/*        <p className="section-description">*/}
      {/*          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ex facere impedit nostrum*/}
      {/*          obcaecati. Ipsam, magnam nam nihil quisquam repellendus tempora. Dicta dignissimos ex laudantium*/}
      {/*          reiciendis sapiente ut voluptate voluptatibus?*/}
      {/*        </p>*/}

      {/*        <div className="mt-5">*/}
      {/*          <Link href="/icons" className="btn">*/}
      {/*            Read more about icons*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="col-6" data-aos="fade-up">*/}
      {/*        <div className="highlight highlight-readonly" data-language="html">*/}
      {/*          <SyntaxHighlighter language={"xml"} useInlineStyles={false}>*/}
      {/*            {highlighCode}*/}
      {/*          </SyntaxHighlighter>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<News />*/}
      {/*<Projects />*/}
      <FAQ />
    </>
  );
}

HomePage.bodyClass = 'xxx';
