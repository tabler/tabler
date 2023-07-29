import { MetadataRoute } from 'next';
import { allDocs, allGuides, allPages, allPosts } from '@/.contentlayer/generated';



import { uiUrl } from '@/config/site';





const pages = [
  'testimonials',
  'support',
  'icons',
  'guides',
  'features',
  'emails',
  'emails/gallery',
  'docs',
  'blog'
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: uiUrl,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: `${uiUrl}/${page}`,
      lastModified: new Date(),
    })),
    ...allPages.map((page) => ({
      url: `${uiUrl}/${page.slugAsParams}`,
      lastModified: new Date(),
    })),
    ...[...allDocs, ...allGuides, ...allPosts].map((doc) => ({
      url: `${uiUrl}${doc.slug}`,
      lastModified: new Date(),
    })),
  ];
}
