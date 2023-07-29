'use client';

import { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';

import Icon from '@/components/Icon';

const sliderConfiguration = {
  gap: 0,
  perView: 1,
  type: 'carousel',
  autoplay: 7000,
  animationDuration: 1000,
};

export default function Slider({
  slides = [],
  style = {},
}: {
  slides: React.ReactNode[]
  style?: React.CSSProperties
}) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glide = new Glide(wrapper.current, sliderConfiguration).mount();

    return () => glide.destroy();
  }, []);

  return (
    <div ref={wrapper} className="glide" style={style}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {slides.map((slide, i) => (
            <li className="glide__slide slider" key={i}>
              {slide}
            </li>
          ))}
        </ul>
      </div>
      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--prev"
          data-glide-dir="<"
          aria-label="Previous slide"
        >
          <Icon name="chevron-left" />
        </button>
        <button
          className="glide__arrow glide__arrow--next"
          data-glide-dir=">"
          aria-label="Next slide"
        >
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  );
}
