'use client';

import { useState } from 'react';
import { useClipboard } from '@/hooks';
import clsx from 'clsx';
// import glob from 'glob';


const importFiles = (type) => {
  return [];
  //return glob.sync(`./public/samples/${type}/*.{jpg,png}`).map((file) => file.replace('./public', ''))
};

export default function SamplesPage() {

  const clipboard = useClipboard();
  const types = [
    {
      title: 'Avatars',
      list: importFiles('avatars'),
    },
    {
      title: 'Photos',
      list: importFiles('photos'),
    },
    {
      title: 'Products',
      list: importFiles('products'),
    },
    {
      title: 'Tracks',
      list: importFiles('tracks'),
    },
  ];

  let [clicked, setClicked] = useState([]);

  return (
    <>
      {types.map((type, i) => (
        <section className={clsx('section', i % 2 === 0 ? '' : 'section-light')} key={type.title}>
          <div className="container">
            <div>
              <h3 className="mb-4">{type.title}</h3>
              <div className="row">
                {type.list.map((item) => (
                  <div className="col-auto" key={item}>
                    <img
                      src={`${item}`}
                      alt=""
                      style={{ width: '80px', opacity: clicked.indexOf(item) >= 0 ? 0.2 : 1 }}
                      onClick={() => {
                        clipboard.copy(item);
                        setClicked([item, ...clicked]);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
