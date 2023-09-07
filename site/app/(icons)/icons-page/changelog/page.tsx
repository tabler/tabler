'use client';

import IconSvg from '@/components/IconSvg';
import * as IconsApi from '@/data/icons-api';
import { groupBy } from '@/helpers';
import { IconsType } from '@/types';
import { Container } from '@tabler/react';
import { useEffect, useState } from 'react';

export default function ChangelogPage() {
  const [groupedIcons, setGroupedIcons] = useState({});
  useEffect(() => {
    IconsApi.getIcons().then((data) => {
      if (data) {
        setGroupedIcons(sortByVersionDesc(groupBy(data.icons, 'version')));
      }
    });
  }, []);

  return (
    <section className="section">
      <Container>
        <div className="section-header">
          <div className="section-title">Tabler Icons Changelog</div>
        </div>
        <div className="divider-y11">
          {/* TODO Add styles for divider-y-11 class */}
          {Object.entries<IconsType>(groupedIcons).map(([version, icons]) => (
            <div className="row" key={version}>
              <div className="sm:col-3">
                <h4 id={version}>
                  <a href={`#${version}`}>Version {version}</a>
                </h4>
                <p className="text-muted">{icons.length} new icons</p>
              </div>
              <div className="col">
                <div>
                  {icons.map((icon) => (
                    <a
                      key={icon.name}
                      className="text-reset icon-demo-icon icon-demo-size-32 icon-demo-stroke-150 tooltip"
                      href={'./' + icon.name}
                      data-title={icon.name}
                    >
                      <IconSvg svg={icon.svg} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const sortByVersionDesc = function (xs: {}) {
  const sorted = Object.keys(xs).sort((a, b) => {
    const valueA = a.split('.').map((a) => +a);
    const valueB = b.split('.').map((b) => +b);

    return valueA[0] === valueB[0] ? valueA[1] - valueB[1] : valueA[0] - valueB[0];
  });
  return sorted.reverse().reduce((obj, key) => {
    obj[key] = xs[key];
    return obj;
  }, {});
};
