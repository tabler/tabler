import { componentsCount, componentsRounded, emailsCount, emailsPrice } from '@/config/site';
import Svg from '@/components/Svg';
import Link from '@/components/Link';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function LayoutHeroUiComponents() {
  return (
    <header className="hero pb-8">
      <div className="container">
        <div className="row items-center">
          <div className="col text-left" data-aos="fade-up">
            <div className="hero-subheader">Tabler Components</div>
            <h1 className="hero-title">{componentsRounded}+ responsive components built with Tabler</h1>
            <p className="hero-description mt-4">
              Build your next website even faster with premade responsive components designed and built by Tabler
              maintainers and community. All components are free forever for everyone.
            </p>

            <div className="mt-7">
              <div className="row g-3">
                <div className="col-auto">
                  <a href="#" className="btn btn-lg btn-primary">
                    Buy now for ${emailsPrice}
                  </a>
                </div>
                <div className="col-auto">
                  <Link href="/emails/gallery" className="btn btn-lg">
                    Browse gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col" data-aos="fade-up">
            <div className="hero-img-side pl-5">
              <ResponsiveImage src="/img/components/hero.png" class="hero-image" width="552" height="420" alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
