import { iconsCount, iconsGithubUrl, iconsUrl } from '@/config/site';
import ResponsiveImage from '@/components/ResponsiveImage';
import Icon from '@/components/Icon';
import React from 'react';
import Slider from '@/components/Slider';

export default function LayoutHeroUiIcons() {
  return (
    <header className="hero">
      <div className="container">
        <div className="row items-center xl:g-6">
          <div className="md:col-6 md:text-left" data-aos="fade-up">
            <div className="hero-subheader">Tabler Icons</div>
            <h1 className="hero-title">Pixel-perfect icons that match your design</h1>
            <p className="hero-description mt-4">
              {iconsCount} free, open source icons designed to make your website or app attractive, visually
              consistent and simply beautiful.
            </p>
            <div className="mt-5 lg:mt-7">
              <div className="row justify-center md:justify-start g-3">
                <div className="col-auto">
                  <a href={iconsUrl} className="btn btn-lg btn-primary" target="_blank">
                    <Icon name="search" /> Browse icons
                  </a>
                </div>
                <div className="col-auto">
                  <a href={iconsGithubUrl} className="btn btn-lg" target="_blank" rel="noopener noreferrer">
                    See on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-6 md:order-first" data-aos="fade-up">
            <div className="hero-img-side">
              <Slider
                style={{
                  background: 'url(/img/icons/hero-bg.svg) no-repeat center/contain'
                }}
                slides={[
                  <ResponsiveImage
                    src="/img/icons/hero-1.png"
                    className="mx-auto"
                    width="552"
                    height="420"
                    alt=""
                    key="hero-1"
                  />,
                  <ResponsiveImage
                    src="/img/icons/hero-2.png"
                    className="mx-auto"
                    width="552"
                    height="420"
                    alt=""
                    key="hero-2"
                  />,
                  <ResponsiveImage
                    src="/img/icons/hero-3.png"
                    className="mx-auto"
                    width="552"
                    height="420"
                    alt=""
                    key="hero-3"
                  />,
                  <ResponsiveImage
                    src="/img/icons/hero-4.png"
                    className="mx-auto"
                    width="552"
                    height="420"
                    alt=""
                    key="hero-4"
                  />,
                  <ResponsiveImage
                    src="/img/icons/hero-5.png"
                    className="mx-auto"
                    width="552"
                    height="420"
                    alt=""
                    key="hero-5"
                  />
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
