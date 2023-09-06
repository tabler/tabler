'use client';

import IconModal from '@/components/IconModal';
import IconsSearch from '@/components/IconsSearch';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { useLocalStorage } from '@/hooks';
import { IconsType } from '@/types';
import { useContext, useState } from 'react';

const IconsList = ({ filteredIcons, stroke, size }: { filteredIcons: IconsType; stroke: number; size: number }) => {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="row" data-aos-id-icons>
          {filteredIcons.slice(0, 100).map((icon) => (
            <ModalProvider modalContent={<IconModal {...icon} />} key={icon.name}>
              <IconBox name={icon.name} svg={icon.svg} iconStroke={stroke} iconSize={size} />
            </ModalProvider>
          ))}
        </div>
      </div>
    </section>
  );
};

const IconBox = ({
  name,
  svg,
  iconStroke,
  iconSize,
}: {
  name: string;
  svg: string;
  iconStroke: number;
  iconSize: number;
}) => {
  let { handleModal } = useContext(ModalContext);

  return (
    <div className="sm:col-4 md:col-3 lg:col-2" key={name} onClick={handleModal}>
      {/*TODO AOS data-aos="fade-up" data-aos-anchor="[data-aos-id-icons]"*/}
      <span className="icon-card text-centered">
        <IconSvg
          svg={svg}
          key={name}
          className={'icon-demo-stroke-' + iconStroke * 100 + ' icon-demo-size-' + iconSize}
        />
        <div className="icon-name">{name}</div>
      </span>
    </div>
  );
};

export default function IconsPage() {
  const [filteredIcons, setFilteredIcons] = useState<IconsType>([]);
  const [stroke, setStroke] = useLocalStorage<number>('icon-stroke', 1.25);
  const [size, setSize] = useLocalStorage<number>('icon-size', 24);

  return (
    <>
      <IconsSearch
        setFilteredIcons={setFilteredIcons}
        stroke={stroke}
        setStroke={setStroke}
        size={size}
        setSize={setSize}
      />
      <IconsList filteredIcons={filteredIcons} stroke={stroke} size={size} />
    </>
  );
}
