import Testimonials from '@/components/layout/Testimonials';

export const metadata = {
  title: 'Testimonials',
  description: 'Read what our customers are saying about us. Explore testimonials and see why people love our products and services.',
};

export default function TestimonialsPage() {
   return <>
      <section className="section">
         <div className="container">
            <div className="section-header">
               <h2 className="section-title section-title-lg">Our Wall Of Love</h2>
               <p className="section-description">
                  Reviews and feedback from our satisfied users who have experienced our products.
               </p>
            </div>

            <Testimonials />
         </div>
      </section>
   </>;
}
