import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <Header className="header-docs" />
      <main className="main bg-white">{children}</main>
      <Footer />
    </>
  );
}
