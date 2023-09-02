import Icon from '@/components/Icon';
import IconSvg from '@/components/IconSvg';
import React from 'react';

export default function IconDemo({ name, svg }: { name: string; svg: string }) {
  const sizes = [16, 32, 48, 64, 80, 96, 112, 128];
  const strokes = [75, 100, 125, 150, 175, 200, 225];

  const CurrentIconSvg = () => <IconSvg svg={svg} key={name} />;

  const socials = [
    { icon: <Icon name="heart" />, number: 73 },
    { icon: <Icon name="thumb-up" />, number: 18 },
    { icon: <Icon name="brand-twitter" />, number: 17 },
    { icon: <CurrentIconSvg />, number: 69 },
  ];

  return (
    <div className="container">
      <div className="mb-9">
        <h2 className="h3 mt-0 mb-4">Icon demo</h2>
        <div className="icon-demos-grid">
          <div className="icon-demo px-2">
            {sizes.map((size) => (
              <div
                key={name + size}
                className={'icon-demo-icon icon-demo-stroke-200 icon-demo-size-' + size + ' tooltip tooltip-monospaced'}
                data-title={'width="' + size + '" height="' + size + '"'}
              >
                <CurrentIconSvg />
              </div>
            ))}
          </div>

          <div className="icon-demo px-2">
            {strokes.map((stroke) => (
              <div
                key={name + stroke}
                className={
                  'icon-demo-icon icon-demo-size-32 icon-demo-stroke-' + stroke + ' tooltip tooltip-monospaced'
                }
                data-title={'stroke-width="' + stroke + '"'}
              >
                <CurrentIconSvg />
              </div>
            ))}
          </div>

          <div className="icon-demo">
            <div className="text-center lh-1">
              <div className="icon-demo-icon icon-demo-stroke-150 icon-demo-size-32">
                <CurrentIconSvg />
              </div>
              <div className="text-uppercase font-h5 mt-2 font-medium">
                Loading<span className="animated-ellipsis"></span>
              </div>
            </div>
          </div>

          <div className="icon-demo">
            <div className="icon-demo-icon">
              <div className="icon-item-new"></div>
              <span className="icon-pulse icon-demo-size-32 icon-demo-stroke-150">
                <CurrentIconSvg />
              </span>
            </div>
            <div className="icon-demo-icon ml-4">
              <span className="icon-tada icon-demo-size-32 icon-demo-stroke-150">
                <CurrentIconSvg />
              </span>
            </div>
          </div>

          <div className="icon-demo">
            <div className="lh-base text-muted icon-demo-inline">
              <h3 className="mt-0 text-base">
                <CurrentIconSvg />
                &nbsp;She looks like one.
              </h3>
              <div>
                The nose? Burn her!&nbsp;
                <span className="text-base">
                  <CurrentIconSvg />
                  Now, look here
                </span>
                , my good man. Burn her anyway!
              </div>
            </div>
          </div>

          <div className="icon-demo pointer-events-none">
            <div className="btn-list">
              <span className="btn btn-primary disabled">
                <CurrentIconSvg />
                &nbsp;Save
              </span>
              <span className="btn disabled">
                <CurrentIconSvg />
                &nbsp;Cancel
              </span>
            </div>
          </div>

          <div className="icon-demo">
            <div>
              <div className="icon-demo-input mb-2">
                <CurrentIconSvg /> codecalm
              </div>
              <div className="icon-demo-input">
                <Icon name="lock" /> ••••••••
              </div>
            </div>
          </div>

          <div className="icon-demo">
            <div>
              <div className="icon-demo-message">
                <div className="icon-demo-message-icon">
                  <CurrentIconSvg />
                </div>
                <div className="icon-demo-message-text">
                  Oh! Come and see the violence inherent in the system! Help, help, I'm being repressed!
                </div>
              </div>
            </div>
          </div>

          <div className="icon-demo">
            <div className="font-bold lh-1 font-h3">
              <div className="row items-center icon-demo-size-24 icon-demo-stroke-200"> {/* gx-8 omitted */}
                {socials.map((social) => (
                  <div className="col-auto d-flex items-center" key={'icon-' + social.number}>
                    <span className="mr-2">{social.icon}</span>
                    &nbsp;{social.number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
