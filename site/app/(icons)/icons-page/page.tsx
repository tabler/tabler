import { icons } from '@/config/tabler';
import IconSvg from '@/components/IconSvg';

const IconsList = () => {
  return (
    <section className="section section-light">
      <div className="container">

        <div className="row" data-aos-id-icons>
          {Object.values(icons).map((icon) => (
            <div className="sm:col-4 md:col-3 lg:col-2" key={icon.name}>
              {/*TODO AOS data-aos="fade-up" data-aos-anchor="[data-aos-id-icons]"*/}
              <span className="icon-card text-centered">
                <IconSvg svg={icon.svg} key={icon.name} className="icon-md" />
                {/*TODO Change size of icon*/}
                <div className="icon-name">{icon.name}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function IconsPage() {
  return (
    <>
      <IconsList />
    </>
  );
}
