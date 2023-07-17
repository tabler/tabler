import Image from 'next/image';
import testimonials from '@/data/testimonials.json';
import clsx from 'clsx';

import TestimonialsShare from './TestimonialsShare';

export default function Testimonials({ limit = 0 }) {
  let testimonialsList = testimonials;

  if (limit) {
    testimonialsList = testimonials.slice(0, limit);
  }

  return (
    <>
      <div className="row" data-aos-id-blocks-testimonials>
        {testimonialsList.map((column, id) => (
          <div
            className={clsx('col-12 sm:col', id === 2 && 'd-none lg:d-block')}
            key={id}
          >
            {column.map((testimonial, id2) => (
              <a
                href={testimonial.url}
                className="testimonial"
                target="_blank"
                rel="noopener noreferrer"
                key={id2}
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks-testimonials]"
                data-aos-delay={id2 * 150 + id * 50}
              >
                <div className="row g-3 items-center">
                  <div className="col-auto">
                    <Image
                      className="avatar avatar-lg d-block"
                      src={`/img/testimonials/${testimonial.avatar}`}
                      width={48}
                      height={48}
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="col">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-muted">{testimonial.job}</div>
                  </div>
                </div>

                <div className="mt-3">{testimonial.description}</div>
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <TestimonialsShare />
      </div>
    </>
  );
}
