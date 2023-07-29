import clsx from 'clsx';

export default function TablerLogos() {
  const logos = [
    { src: '/img/favicon.svg' },
    { src: '/img/logo-tabler.svg' },
    { src: '/img/logo-tabler-gray.svg', className: 'bg-light' },
    { src: '/img/logo-tabler-white.svg', className: 'bg-dark' }
  ];

  return (
    <div className="row g-6">
      {logos.map(logo => (
        <div className="md:col-6" key={logo.src}>
          <div className="row g-3">
            <div className="col-12">
              <div className={clsx('card p-5 d-flex justify-center', logo.className)}>
                <img src={logo.src} alt="" />
              </div>
            </div>
            <div className="col-12">
              <a href={logo.src} className="btn btn-block" download={true}>
                Download SVG
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
