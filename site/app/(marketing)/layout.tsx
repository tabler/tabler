import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AOS from '@/components/AOS';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <AOS>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </AOS>
    </>
  );
}
