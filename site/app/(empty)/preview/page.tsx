'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { PreviewLayout } from "@/layouts/PreviewLayout"
import clsx from 'clsx';

import { uiDemoUrl, uiDownloadUrl } from '@/config/site';
import Icon from '@/components/Icon';

const devices = [
  { name: 'mobile', width: 375, icon: 'device-mobile' },
  { name: 'tablet', width: 960, icon: 'device-tablet' },
  { name: 'desktop', width: '100%', icon: 'device-desktop' },
];

export default function PreviewPage() {
  const [currentDevice, setCurrentDevice] = useState('desktop');
  const [width, setWidth] = useState<string|number>('100%');

  return (
    <div className="preview">
      <iframe
        className="preview-iframe"
        src={uiDemoUrl}
        frameBorder="0"
        style={{ width }}
      />
      <div className="preview-navbar">
        <div className="mr-auto">
          <Link href="/" className="preview-navbar-link">
            <span className="logo logo-white logo-square" aria-label="Tabler" />
          </Link>
        </div>
        <div className="preview-navbar-devices">
          {devices.map((device) => (
            <button
              key={device.name}
              className={clsx('preview-navbar-link', {
                active: device.name === currentDevice,
              })}
              title={`Preview template on ${device.name}`}
              onClick={() => {
                setCurrentDevice(device.name);
                setWidth(device.width);
              }}
            >
              <Icon name={device.icon} />
            </button>
          ))}
        </div>
        <div className="ml-auto d-flex">
          <a href={uiDownloadUrl} className="btn btn-primary btn-responsive-sm lemonsqueezy-button">
            <Icon name="download" />
            <span className="btn-responsive-text">Download Tabler</span>
          </a>
          <a href={uiDemoUrl} className="preview-navbar-link ml-3">
            <Icon name="x" />
          </a>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       meta: {
//         bodyClassName: "o-auto",
//       },
//     },
//   }
// }
