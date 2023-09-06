'use client';

import IconCodes from '@/components/icon-preview/IconCodes';
import IconDemo from '@/components/icon-preview/IconDemo';
import IconInfo from '@/components/icon-preview/IconInfo';
import SectionDivider from '@/components/SectionDivider';
import { icons } from '@/config/tabler';
import { useClipboard } from '@/hooks';
import { Container } from '@tabler/react';
import React from 'react';

const IconPreviewPage = ({ params }: { params: { slug: string } }) => {
  const icon = Object.values(icons).find((i) => i.name == params.slug);
  const clipboard = useClipboard();

  if (!icon) {
    return (
      <>
        <section className="section section-light">
          <Container>
            <h1>Icon {params.slug} does not exist!</h1>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="section pb-0">
        <Container className="icon-preview-container">
          <IconInfo icon={icon} clipboard={clipboard} />
          <IconCodes icon={icon} clipboard={clipboard} />
        </Container>
      </section>
      <section className="section section-white pt-4">
        <SectionDivider /> {/* TODO Not visible*/}
        <IconDemo name={icon.name} svg={icon.svg} />
      </section>
    </>
  );
};

export default IconPreviewPage;
