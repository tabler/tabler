import Icon from '@/components/Icon';
import { escapeHtml, iconsCountRounded, iconsUrl } from '@/config/site';

const twitterUrl = `https://twitter.com/intent/tweet?url=${escapeHtml(
  iconsUrl
)}&via=codecalm&text=Over%20${iconsCountRounded}%20free%20and%20open%20source%20icons%20for%20web%20design%3A%20Tabler%20Icons&hashtags=opensource,icons,iconfont,freebie`;

const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${escapeHtml(iconsUrl)}`;

export default function LayoutHeroIcons() {
  return (
    <div>
      <header className="hero pb-8">
        <div className="container">
          <h1 className="hero-title">Over {iconsCountRounded} pixel-perfect icons for web design</h1>
          <p className="hero-description mt-4">
            Free and open source icons designed to make your website or app attractive, visually consistent and simply
            beautiful.
          </p>

          <div className="mt-5">
            <div className="row g-3 justify-center">
              <div className="col-auto">
                <a href={twitterUrl} className="btn btn-twitter" target="_blank" rel="noopener noreferrer">
                  <Icon name="brand-twitter" />
                  Tweet me
                </a>
              </div>
              <div className="col-auto">
                <a href={fbUrl} className="btn btn-facebook" target="_blank" rel="noopener noreferrer">
                  <Icon name="brand-facebook" />
                  Share me
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
