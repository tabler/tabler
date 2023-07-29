export const metadata = {
  title: 'Documentation',
  template: '%s - Documentation',
  description: 'Get started with Tabler, the one of world’s most popular framework for building responsive, mobile-first dashboards.',
};

export default function DocsLayout({ children /*, meta = {}, pageProps*/ }) {
  return (
    <div className="border-bottom border-top">
      <div className="container">
        {children}
      </div>
    </div>
  );
}
