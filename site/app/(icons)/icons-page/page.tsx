'use client';

import IconModal from '@/components/IconModal';
import IconsSearch from '@/components/IconsSearch';
import IconSvg from '@/components/IconSvg';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import { useLocalStorage } from '@/hooks';
import usePagination from '@/hooks/use-pagination';
import { IconsType } from '@/types';
import { Button, Container } from '@tabler/react';
import { useContext, useState } from 'react';

const IconsList = ({ filteredIcons, stroke, size }: { filteredIcons: IconsType; stroke: number; size: number }) => {
  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(filteredIcons, 60);

  return (
    <section className="section section-light">
      <Container>
        <div className="row" data-aos-id-icons>
          {currentData().map((icon) => (
            <ModalProvider modalContent={<IconModal {...icon} />} key={icon.name}>
              <IconBox name={icon.name} svg={icon.svg} iconStroke={stroke} iconSize={size} />
            </ModalProvider>
          ))}
        </div>
        {/* TODO Set styles */}
        <div className="row mt-2">
          <Button className="col-2" onClick={() => jump(1)} disabled={currentPage <= 1}>
            First
          </Button>
          <Button className="col-2" onClick={() => prev()} disabled={currentPage <= 1}>
            Previous
          </Button>
          <span className="col-4 text-center">
            Page {currentPage} of {maxPage}
          </span>
          <Button className="col-2" onClick={() => next()} disabled={currentPage >= maxPage}>
            Next
          </Button>
          <Button className="col-2" onClick={() => jump(maxPage)} disabled={currentPage >= maxPage}>
            Last
          </Button>
        </div>
      </Container>
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
