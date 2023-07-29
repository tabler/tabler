import React from 'react';
import { icons } from '@/config/tabler';
import { groupBy, sortByKeys } from '@/helpers';
import { IconType, IconsType } from '@/types';

import { figmaPluginUrl, iconsCount, iconsCountRounded, iconsUrl } from '@/config/site';
import Features from '@/components/Features';
import Icon from '@/components/Icon';
import IconSvg from '@/components/IconSvg';
import ResponsiveImage from '@/components/ResponsiveImage';
import SectionDivider from '@/components/SectionDivider';
import HeroIcons from '@/components/layout/hero/UiIcons';

export const metadata = {
  title: 'Tabler Icons',
  description: 'Explore our Tabler Icons package. Enhance your designs with a diverse collection of stunning icons.',
};

// const IconsInstallation = () => {
//   return (
//     <section className="section section-light">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">Installation</h2>
//         </div>
//       </div>
//     </section>
//   )
// }

// const IconsFrameworks = () => {
//   const frameworks = [
//     { name: 'React', route: '/docs/icons/react', package: '@tabler/icons-react', icon: 'react' },
//     { name: 'Svelte', route: '/docs/icons/svelte', package: '@tabler/icons-svelte', icon: 'svelte' },
//     { name: 'Blade', route: '/docs/icons/blade', package: '@tabler/icons-blade', icon: 'blade' },
//     { name: 'Vue 3', route: '/docs/icons/vue', package: '@tabler/icons-vue', icon: 'vue' },
//     { name: 'Preact', route: '/docs/icons/preact', package: '@tabler/icons-preact', icon: 'preact' },
//     { name: 'Figma', href: figmaPluginUrl, package: '@tabler/icons-figma', icon: 'figma' },
//   ]
//
//   return (
//       <section className="section section-sm section-light">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Frameworks</h2>
//           </div>
//
//           <div className="row justify-center g-4">
//             {frameworks.map((framework) => (
//                 <div className="col" key={framework.icon}>
//                   {framework.route ?
//                       <Link href={framework.route} className="d-block text-center text-reset bg-white border rounded-lg py-3">
//                         <img src={`/img/tabler-icons/framework/${framework.icon}.svg`} alt={framework.name} className="mx-auto mb-2" />
//                         {framework.name}
//                       </Link>
//                       :
//                       <a href={framework.href} className="d-block text-center text-reset bg-white border rounded-lg py-3" target="_blank" rel="noopener noreferrer">
//                         <img src={`/img/tabler-icons/framework/${framework.icon}.svg`} alt={framework.name} className="mx-auto mb-2" />
//                         {framework.name}
//                       </a>}
//                 </div>
//             ))}
//           </div>
//         </div>
//       </section>
//   )
// }

const IconsFigma = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row xl:g-7 items-center">
          <div className="md:col-6">
            <ResponsiveImage src="/img/tabler-icons/features/figma.png" width="564" height="448" />
          </div>
          <div className="md:col-6">
            <div className="section-header text-left">
              <h2 className="section-title">Do you need Figma plugin? No problem!</h2>
              <p className="section-description">
                Tabler Icons offers a plugin for Figma, with which you can easily find and customize the icons you just need. You will always find the newest icons that you can quickly add to your project!
              </p>
            </div>

            <div className="btn-list mt-6">
              <a href={figmaPluginUrl} className="btn btn-lg" target="_blank" rel="noopener noreferrer">
                <Icon name="brand-figma" /> Get Figma plugin
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IconsFeatures = () => {
  const features = [
    {
      icon: 'check',
      title: 'Ready-to-use',
      description: 'You can use the icons as HTML images, embed them in your HTML code, create an SVG sprite or render them in React.',
    },
    {
      icon: 'brand-sketch',
      title: 'Multiple formats',
      description: 'Icons can be used in Sketch, Illustrator, XD and Figma - choose the tool you feel the most comfortable working with.',
    },
    {
      icon: 'edit',
      title: 'Customizable',
      description: 'Every icon is designed on a 24x24 grid and a 2px stroke. You can easily customize them, changing the size, stroke or color.',
    },
    {
      icon: 'brand-github',
      title: 'Free and open source',
      description: 'Tabler Icons is a free and open source solution, which is continuously developed. Feel free to request an icon you need!',
    },
  ];

  return (
    <section className="section section-sm section-light">
      <SectionDivider wave />
      <div className="container">
        {/*<div className="section-header">*/}
        {/*  <h2 className="section-title">*/}
        {/*    Icons tailored to your needs*/}
        {/*  </h2>*/}
        {/*</div>*/}
        <Features list={features} />
      </div>
    </section>
  );
};

const IconsCategories = () => {
  const iconsGroupedByCategory = ((icons) => {
    return sortByKeys(groupBy(Object.values(icons), 'category'));
  })(icons);

  delete iconsGroupedByCategory[''];
  delete iconsGroupedByCategory['Gender'];
  delete iconsGroupedByCategory['Zodiac'];
  delete iconsGroupedByCategory['Database'];
  delete iconsGroupedByCategory['Building'];
  delete iconsGroupedByCategory['Logic'];
  delete iconsGroupedByCategory['Currency'];
  delete iconsGroupedByCategory['Animals'];

  return (
    <section className="section section-light">
      <div className="container">
        <div className="section-header">
          <div className="section-title">Wide choice of categories</div>
          <div className="section-description">Search for icons by categories to find what you need easier and faster. Tabler icons will help you make your design consistent and eye-catching.</div>
        </div>

        <div className="row" data-aos-id-blocks-icons>
          {Object.entries<IconsType>(iconsGroupedByCategory).map(([category, icons], i) => (
            <div className="sm:col-6 md:col-4 lg:col-3" key={category} data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks-icons]" data-aos-delay={i * 50}>
              <a href={`${iconsUrl}?category=${encodeURIComponent(category)}`} className="icons-card" target="_blank">
                <strong className="icons-card-title">{category}</strong>
                <div className="icons-card-list">
                  {icons.filter((icon) => !icon.name.endsWith('-off')).map((icon, i) => i < 14 && <IconSvg svg={icon.svg} key={icon.name} className="icons-card-icon" />)}

                  {icons.length > 15 && <div className="icons-card-placeholder">+{icons.length - 14}</div>}
                </div>
                <span className="icons-card-layer">
                  <Icon name="search" /> Browse {icons.length} icons
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function IconsPage() {
  return (
    <>
      <HeroIcons />
      <IconsFeatures />
      <IconsFigma />
      {/*<IconsFrameworks />*/}
      <IconsCategories />
      {/*<IconsInstallation />*/}
    </>
  );
}
