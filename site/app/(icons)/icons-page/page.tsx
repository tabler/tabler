'use client';

import IconsSearch from '@/components/IconsSearch';
import { icons } from '@/config/tabler';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { IconsType } from '@/types';
import { useContext, useState } from 'react';
import IconModal from '@/components/IconModal';

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
        <IconSvg svg={svg} key={name} className={'s-w-' + iconStroke * 100 + ' size-' + iconSize} />
        {/*TODO Change size of icon*/}
        <div className="icon-name">{name}</div>
      </span>
    </div>
  );
};

export default function IconsPage() {
  const availableIcons: IconsType = Object.values(icons);

  const [filteredIcons, setFilteredIcons] = useState(availableIcons);
  const [stroke, setStroke] = useState(1.25);
  const [size, setSize] = useState(24);

  return (
    <>
      <IconsSearch
        availableIcons={availableIcons}
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
