import clsx from 'clsx';

import { footerMenu, socialLinks } from '@/config/site';
import Icon from '@/components/Icon';
import Link from '@/components/Link';

const FooterMenu = ({ border = false }: { border?: boolean }) => (
  <footer className="footer">
    <div className="container">
      <div className={clsx('py-6', border && 'border-top')}>
        <div className="row">
          <div className="lg:col-7">
            <div className="row">
              {footerMenu.map((column) => (
                <div className="sm:col-6 md:col" key={column.title}>
                  <div className="h-subheader mb-3">{column.title}</div>
                  <ul className="list-unstyled list-separated">
                    {column.items.map((item) => (
                      <li key={item.title}>
                        {item.route ? (
                          <Link href={item.route} className="link-muted">
                            {item.title}
                          </Link>
                        ) : (
                          <a href={item.href} className="link-muted" target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-4 ml-auto">
            <div className="logo logo-gray mb-4" />

            <div className="text-muted">Tabler comes with tons of well-designed components and features. Start your adventure with Tabler and make your dashboard great again. For free!</div>

            <div className="mt-4 lg:mt-6">
              <div className="row gx-3">
                {socialLinks.map((social) => (
                  <div className="col-auto" key={social.icon}>
                    <a href={social.url} className="link-muted" aria-label="social.label" target="_blank" rel="noopener noreferrer">
                      <Icon name={social.icon} className="icon-md" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FooterMain = () => (
  <footer className="footer">
    <div className="container">
      <div className="py-5 text-center lg:text-left border-top">
        <div className="row">
          <div className="lg:col-auto lg:text-right lg:order-last">
            <div className="row justify-center">
              <div className="col-auto">
                ©
                <a href="https://codecalm.net" className="link-muted" target="_blank" rel="noopener noreferrer">
                  codecalm.net
                </a>
              </div>
              <div className="col-auto">
                <div className="list-inline-dots">
                  <Link href="/terms-of-service" className="link-muted" prefetch={false}>
                    Terms of service
                  </Link>
                  <Link href="/privacy-policy" className="link-muted" prefetch={false}>
                    Privacy policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col">
            Made with <Icon name="heart" color="red" filled /> in Poland.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function Footer() {
  return (
    <>
      <FooterMenu />
      <FooterMain />
    </>
  );
}
