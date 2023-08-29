'use client';

import Icon from '@/components/Icon';
import { icons } from '@/config/tabler';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { useContext, useState } from 'react';
import IconModal from '@/components/IconModal';

const IconsList = ({ filteredIcons }) => {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="row" data-aos-id-icons>
          {filteredIcons.slice(0, 100).map((icon) => (
            <ModalProvider modalContent={<IconModal {...icon} />} key={icon.name}>
              <IconBox name={icon.name} svg={icon.svg} />
            </ModalProvider>
          ))}
        </div>
      </div>
    </section>
  );
};

const Search = ({ setFilteredIcons }) => {
  const filterIcons = (searchPattern: string) => {
    setFilteredIcons(Object.values(icons).filter((icon) => icon.name.includes(searchPattern)));
  };

  return (
    <section className="section section-light">
      <div className="container icon-search">
        <div className="row gx-3 items-center">
          <div className="col-auto d-flex">
            <Icon name="search" />
          </div>
          <div className="col">
            <input
              type="text"
              className="icon-search-input"
              placeholder={'Search ' + Object.values(icons).length + ' icons'}
              onChange={(e) => filterIcons(e.target.value.toLowerCase())}
            />
          </div>
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
  const [filteredIcons, setFilteredIcons] = useState(Object.values(icons));

  return (
    <>
      <Search setFilteredIcons={setFilteredIcons} />
      <IconsList filteredIcons={filteredIcons} />
    </>
  );
}
