'use client';

import React, { useState } from 'react';
import clsx from 'clsx';



import { uiPackageName, uiVersion } from '@/config/site';
import { generateIframeContent } from '@/lib/components';





export default function ExampleIframe({
  html,
  height = 15,
  wrapper,
  backgroundColor = '',
  plugins,
  resizabe = false,
  className
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const iframeLoaded = e => {
    setContentHeight(e.target.contentWindow.document.body.scrollHeight);
  };
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

  const srcDoc = generateIframeContent({
    html,
    wrapper,
    plugins,
    backgroundColor
  });

  // React.useEffect(() => {
  //   const iframe = iframeRef.current
  //   // const listener = e => console.log(e)

  //   // iframe && iframe.addEventListener("load", listener)

  //   // return () => {
  //   //   iframe && iframe.removeEventListener("load", listener)
  //   // }
  // })

  return (
    <iframe
      ref={iframeRef}
      className={clsx('example-frame', resizabe && 'example-frame-resizable', className)}
      srcDoc={srcDoc}
      style={{ minHeight: `${height}rem`, height: `${contentHeight}px` }}
      onLoad={iframeLoaded}
    />
  );
}
