'use client';

import { icons } from '@/config/tabler';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { useContext } from 'react';

const IconsList = () => {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="row" data-aos-id-icons>
          {Object.values(icons)
            .slice(0, 100)
            .map((icon) => (
              <ModalProvider modalContent={<div>{icon.name}</div>} key={icon.name}>
                <IconBox name={icon.name} svg={icon.svg} />
              </ModalProvider>
            ))}
        </div>
      </div>
    </section>
  );
};

const IconBox = ({ name, svg }) => {
  let { handleModal } = useContext(ModalContext);

  return (
    <div className="sm:col-4 md:col-3 lg:col-2" key={name} onClick={handleModal}>
      {/*TODO AOS data-aos="fade-up" data-aos-anchor="[data-aos-id-icons]"*/}
      <span className="icon-card text-centered">
        <IconSvg svg={svg} key={name} className="icon-md" />
        {/*TODO Change size of icon*/}
        <div className="icon-name">{name}</div>
      </span>
    </div>
  );
};

export default function IconsPage() {
  return (
    <>
      <IconsList />
    </>
  );
}
