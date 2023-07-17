'use client';

import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import clsx from 'clsx';



import { componentsRounded, iconsCountRounded, sponsorsUrl, uiGithubUrl } from '@/config/site';
import Icon from '@/components/Icon';
import GoToTop from '@/components/layout/GoToTop';
import Link from '@/components/Link';
import NavLink from '@/components/NavLink';
import Shape from '@/components/Shape';





// import { useRouter } from 'next/router'

const NavDropdown = ({ title, children, active, footer = false }) => {
  return (
    <Popover className="navbar-dropdown">
      {({ open }) => (
        <>
          <Popover.Button className={clsx('navbar-link', active && 'active')}>{title}</Popover.Button>
          <Popover.Panel className="navbar-dropdown-menu">
            <div className="navbar-dropdown-menu-content">{children}</div>
            {footer && <div className="navbar-dropdown-menu-footer">{footer}</div>}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

const menuLinks = [
  {
    title: 'UI Kit',
    menu: 'ui',
    children: [
      {
        icon: 'home',
        href: '/',
        title: 'About',
        description: 'Develop beautiful web apps with Tabler',
      },
      {
        icon: 'layout-dashboard',
        href: '/preview',
        title: 'Preview template',
        description: 'See what Tabler looks like and offers',
      },
      {
        icon: 'script',
        href: '/docs',
        title: 'Documentation',
        description: 'Read how to develop apps with Tabler',
      },
      {
        icon: 'lego',
        href: '/features',
        title: 'Features',
        description: 'See what kind of features you can find here',
      },
      {
        icon: 'lifebuoy',
        href: '/support',
        title: 'Support',
        description: 'Write to us if you need anything!',
      },
      {
        icon: 'brand-github',
        href: uiGithubUrl,
        title: 'Source code',
        description: 'View Tabler\'s source code ',
        props: {
          target: '_blank',
          rel: 'nofollow',
        },
      },
    ],
  },
  {
    href: '/emails',
    menu: 'emails',
    title: 'Email templates',
  },
  {
    href: '/icons',
    menu: 'icons',
    title: (
      <>
        <span className="d-none lg:d-inline">Over {iconsCountRounded} </span>
        Icons
      </>
    ),
  },
  {
    href: '/blog',
    menu: 'blog',
    title: (
      <>
        Blog
      </>
    ),
  },
  {
    href: '/docs',
    menu: 'docs',
    title: 'Documentation',
  },
  // {
  //   href: '/guides',
  //   menu: 'guides',
  //   title: 'Guides',
  // },
  {
    menu: 'sponsors',
    href: sponsorsUrl,
    type: 'button',
    title: (
      <span>
        Sponsor<span className="d-none lg:d-inline"> project</span>
      </span>
    ),
    icon: <Icon name="heart" filled color="red" />,
  },
];

const NavbarLink = (link, menu) => {
  // const router = useRouter()

  if (link.type === 'button') {
    return (
      <div className="navbar-item">
        <a href={link.href} className="btn" target="_blank" rel="noopener noreferrer">
          {link.icon}
          {link.title}
        </a>
      </div>
    );
  } else if (link.children) {
    return (
      <NavDropdown title={link.title} active={menu === link.menu}>
        {link.children.map((link) => (
          <Popover.Button
            as={Link}
            href={link.href || ''}
            className="navbar-dropdown-menu-link"
            key={link.title}
            onClick={() => true}
            {...link.props}
          >
            <div className="row g-3">
              <div className="col-auto">
                <Shape icon={link.icon} />
              </div>
              <div className="col">
                <h5 className="mb-1">{link.title}</h5>
                <p className="font-h6 m-0 text-muted">{link.description}</p>
              </div>
            </div>
          </Popover.Button>
        ))}
      </NavDropdown>
    );
  }

  return (
    // router.pathname.replace(/^\//, '').startsWith(link.menu)
    <NavLink href={link.href} className="navbar-link" active={false}>
      {link.title}
    </NavLink>
  );
};

const SidebarLink = (link, menu, onClick) => {
  if (link.type === 'button') {
    return (
      <div className="aside-menu-item mt-4">
        <a href={link.href} className="btn btn-block" target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {link.icon}
          {link.title}
        </a>
      </div>
    );
  } else if (link.children) {
    return (
      <div className="aside-menu-item">
        <div className={clsx('aside-menu-title', { active: menu === link.menu })}>{link.title}</div>
        <div className="aside-menu-children">
          {link.children.map((link) => (
            <Link href={link.href || ''} key={link.title} className="aside-menu-link" onClick={onClick} {...link.props}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link href={link.href} className={clsx('aside-menu-link', { active: menu === link.menu })} onClick={onClick}>
      {link.title}
    </Link>
  );
};

const Navbar = ({
  menu,
  opened,
  onClick,
  ...props
}: {
  menu?: string
  opened?: boolean
  onClick?: (event: React.MouseEvent) => void,
  className?: string,
}) => {
  return (
    <div className={clsx('navbar', opened && 'opened', props.className)}>
      {menuLinks.map((link) => (
        <Fragment key={link.menu}>
          {NavbarLink(link, menu)}
        </Fragment>
      ))}
    </div>
  );
};

export default function Header({ headerStatic, className, pageProps, ...props }:{
  headerStatic?: boolean,
  className?: string,
  pageProps?: any,
}) {
  const bannerId = 'tabler-icons-v2';
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const pop = () => {
    setSticky(window.pageYOffset > 0);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function closeBanner() {
    localStorage.setItem(`banner-${bannerId}`, '1');
    setShowBanner(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', pop);

    if (window.localStorage.getItem(`banner-${bannerId}`) !== '1') {
      setShowBanner(true);
    }

    return () => window.removeEventListener('scroll', pop);
  }, []);

  // const router = useRouter()

  return (
    <>
      {/* {showBanner && (
        <div className="banner">
          <div className="container">
            <div className="text-truncate">
              🎉 Tabler Icons v2.0 has been released: filled icons, new packages: React, Vue, Preact, Svelte, SolidJS
              and more!
            </div>
            <a href="https://tabler-icons.io" className="ml-5 banner-link">
              Learn more →
            </a>
          </div>

          <a onClick={closeBanner} className="banner-close">
            <Icon name="x" />
          </a>
        </div>
      )} */}
      <header
        className={clsx(
          'header',
          // router.pathname.startsWith('/docs') && 'header-bordered',
          headerStatic ? 'header-static' : '',
          sticky && 'header-sticky',
          className
        )}
      >
        <div className="container" data-aos="fade-down">
          <nav className="row items-center">
            <div className="col-auto">
              <Link
                href="/"
                className={clsx('logo'/*, pageProps.brand ? `logo-${pageProps.brand}` : ''*/)}
                aria-label="Tabler"
              />
            </div>
            <div className="col-auto ml-auto">
              <div className="d-none md:d-block">
                {/* <Navbar menu={pageProps.menu} /> */}
                <Navbar />
              </div>

              <div className="md:d-none">
                <button
                  className={clsx('navbar-toggle', {
                    active: isOpen,
                  })}
                  onClick={toggleModal}
                >
                  <span />
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <Dialog open={isOpen} onClose={closeModal} className="modal-backdrop">
        <Dialog.Panel className="modal modal-side">
          <div className={clsx('aside-menu mt-4')}>
            {/* {menuLinks.map((link) => (
              // <Fragment key={link.menu}>{SidebarLink(link, pageProps.menu, closeModal)}</Fragment>
            ))} */}
          </div>
        </Dialog.Panel>
      </Dialog>

      <GoToTop />
    </>
  );
}
