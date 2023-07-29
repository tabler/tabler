import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
