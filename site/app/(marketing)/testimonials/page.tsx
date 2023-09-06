import Testimonials from '@/components/layout/Testimonials';
import { Container } from '@tabler/react';

export const metadata = {
  title: 'Testimonials',
  description: 'Read what our customers are saying about us. Explore testimonials and see why people love our products and services.',
};

export default function TestimonialsPage() {
   return (
     <>
       <section className="section">
         <Container>
           <div className="section-header">
             <h2 className="section-title section-title-lg">Our Wall Of Love</h2>
             <p className="section-description">Reviews and feedback from our satisfied users who have experienced our products.</p>
           </div>

           <Testimonials />
         </Container>
       </section>
     </>
   );
}
