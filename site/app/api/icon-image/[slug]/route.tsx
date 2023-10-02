import { icons } from '@/config/tabler';
import { replaceStrokeInSvg } from '@/helpers';
import { ImageResponse } from 'next/server';
import React from 'react';

// const interRegular = fetch(
//   new URL('../../assets/Inter-Regular.otf', import.meta.url)
// ).then((res) => res.arrayBuffer());

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const icon = Object.values(icons).find((i) => i.name == params.slug);

    if (!icon) {
      return BadRequest();
    }

    const { searchParams } = new URL(request.url);
    const size = +(searchParams.get('size') ?? 200);
    const withName = searchParams.get('withName') !== 'false';
    const withTags = searchParams.get('withTags') !== 'false';
    const stroke = +(searchParams.get('stroke') ?? 2);

    return new ImageResponse(
      (
        <>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignContent: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', width: '100%', alignContent: 'center' }}>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(replaceStrokeInSvg(icon.svg, stroke))}`}
                alt={`icon${icon.name}`}
                style={{ width: size, height: size, margin: '0 auto' }}
              />
            </div>
            {withName ? (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <span style={{ textAlign: 'center', fontSize: '30px' }}>{icon.name}</span>
              </div>
            ) : null}
            {withTags ? (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                <span style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', fontSize: '20px' }}>
                  {icon.tags.map((tag) => (
                    <span key={tag} style={{ marginRight: '3px', marginLeft: '3px' }}>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        </>
      ),
      {
        width: size,
        height: size + (withName ? 40 : 0) + (withTags ? 40 : 0),
        // fonts: [{
        //   name: 'Inter',
        //   weight: 400,
        //   data: await interRegular,
        //   style: 'normal'
        // }]
      },
    );
  } catch {
    return BadRequest();
  }
}

const BadRequest = () => new Response('Cannot get image', { status: 500 });
