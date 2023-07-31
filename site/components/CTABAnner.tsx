export default function CTABanner({
  title,
  description,
  buttonHref,
  buttonText,
  buttonSecondaryHref,
  buttonSecondaryText
}) {
  return (
    <div className="bg-primary text-white rounded p-5 lg:p-6" data-aos="zoom-y-out">
      <div className="row items-center text-center md:text-left">
        <div className="lg:col">
          <h3 className="h1 text-reset font-black">{title}</h3>
          <p className="font-h4 m-0">{description}</p>
        </div>
        <div className="lg:col-auto">
          <div className="row g-2">
            {buttonText && buttonHref && (
              <div className="col-auto">
                <a href={buttonHref} className="btn btn-lg btn-white lemonsqueezy-button">
                  {buttonText}
                </a>
              </div>
            )}
            {buttonSecondaryText && buttonSecondaryHref && (
              <div className="col-auto">
                <a href={buttonSecondaryHref} className="btn btn-lg btn-white btn-outline" target="_blank" rel="noopener noreferrer">
                  {buttonSecondaryText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
