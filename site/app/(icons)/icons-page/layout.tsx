import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AOS from '@/components/AOS';

export const metadata = {
  title: 'Tabler Icons',
  description: 'Explore our Tabler Icons package. Enhance your designs with a diverse collection of stunning icons.',
};

export default function IconsLayout({ children }: { children: React.ReactNode }) {
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
