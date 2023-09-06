import Icon from '@/components/Icon';
import { icons } from '@/config/tabler';
import { getIcons } from '@/data/icons-api';
import Fuse from 'fuse.js';
import { IconsType } from '@/types';
import { Container } from '@tabler/react';
import { useEffect, useState } from 'react';

const fuseOptions = {
  keys: ['name', 'tags'],
};

const CategorySelect = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    ...new Set(
      Object.values(icons)
        .map((icon) => icon.category)
        .filter((category) => category !== ''),
    ),
  ].sort();

  return (
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
  );
};

const StrokeSelect = ({ stroke, setStroke }) => {
  const strokes = [1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="col-auto d-none md:d-flex items-center">
      <span className="text-muted">Stroke:&nbsp;</span>
      <select className="icon-search-select m1-1" defaultValue={stroke} onChange={(e) => setStroke(e.target.value)}>
        {strokes.map((stroke: number) => (
          <option value={stroke} key={stroke}>
            {stroke}
          </option>
        ))}
      </select>
    </div>
  );
};

const SizeSelect = ({ size, setSize }) => {
  const sizes = [16, 20, 24, 28, 32, 36, 40];

  return (
    <div className="col-auto d-none md:d-flex items-center">
      <span className="text-muted">Size:&nbsp;</span>
      <select className="icon-search-select m1-1" defaultValue={size} onChange={(e) => setSize(e.target.value)}>
        {sizes.map((size: number) => (
          <option value={size} key={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
};

export default function IconsSearch({ setFilteredIcons, stroke, setStroke, size, setSize }) {
  let [availableIcons, setAvailableIcons] = useState<IconsType>([]);
  let [searchPattern, setSearchPattern] = useState('');
  let [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getIcons(selectedCategory).then((data) => {
      console.log(data);
      setAvailableIcons(data.icons);
    });
  }, [selectedCategory]);

  useEffect(() => filterIcons(), [searchPattern, availableIcons]);

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
      <Container className="icon-search">
        <div className="row gx-3 items-center">
          <div className="col-auto d-flex">
            <Icon name="search" />
          </div>
          <div className="col">
            <input type="text" className="icon-search-input" placeholder={'Search ' + availableIcons.length + ' icons'} onChange={(e) => setSearchPattern(e.target.value.toLowerCase())} />
          </div>
          <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <StrokeSelect stroke={stroke} setStroke={setStroke} />
          <SizeSelect size={size} setSize={setSize} />
        </div>
      </Container>
    </section>
  );
}
