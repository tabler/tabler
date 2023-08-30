'use client';

import Icon from '@/components/Icon';
import { icons } from '@/config/tabler';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { useContext, useEffect, useState } from 'react';
import IconModal from '@/components/IconModal';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['name', 'tags'],
};
let categories: string[] = [];

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

const Search = ({ availableIcons, setFilteredIcons, categories }) => {
  let [searchPattern, setSearchPattern] = useState('');
  let [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => filterIcons(), [searchPattern, selectedCategory]);

  const filterIcons = () => {
    if (searchPattern) {
      const fuse = new Fuse(
        selectedCategory === 'All'
          ? availableIcons
          : availableIcons.filter((icon) => icon.category === selectedCategory),
        fuseOptions,
      );
      setFilteredIcons(fuse.search(searchPattern).map((searchResult) => searchResult.item));
    } else {
      setFilteredIcons(
        selectedCategory === 'All'
          ? availableIcons
          : availableIcons.filter((icon) => icon.category === selectedCategory),
      );
    }
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
              placeholder={'Search ' + availableIcons.length + ' icons'}
              onChange={(e) => setSearchPattern(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-auto d-flex items-center">
            <div className="form-selector m-1">
              <span className="text-muted">Category:&nbsp;</span>
              <span>{selectedCategory}</span>
              <select
                className="icon-search-select"
                defaultValue={'All'}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value={'All'}>All</option>
                {categories.map((category: string) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
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
  const availableIcons = Object.values(icons);
  categories = [...new Set(availableIcons.map((icon) => icon.category).filter((category) => category !== ''))].sort();
  const [filteredIcons, setFilteredIcons] = useState(availableIcons);

  return (
    <>
      <Search availableIcons={availableIcons} setFilteredIcons={setFilteredIcons} categories={categories} />
      <IconsList filteredIcons={filteredIcons} />
    </>
  );
}
