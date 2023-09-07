'use client';

import IconCodes from '@/components/icon-preview/IconCodes';
import IconDemo from '@/components/icon-preview/IconDemo';
import IconInfo from '@/components/icon-preview/IconInfo';
import SectionDivider from '@/components/SectionDivider';
import * as IconsApi from '@/data/icons-api';
import { useClipboard } from '@/hooks';
import { IconType } from '@/types';
import { Container } from '@tabler/react';
import React, { useEffect, useState } from 'react';

const IconPreviewPage = ({ params }: { params: { slug: string } }) => {
  const [icon, setIcon] = useState<IconType | undefined>(undefined);
  useEffect(() => {
    IconsApi.getIcon(params.slug).then((icon: IconType) => setIcon(icon));
  }, [params.slug]);
  const clipboard = useClipboard();

  if (icon === null) {
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
      {icon !== undefined && (
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
      )}
    </>
  );
};

export default IconPreviewPage;
