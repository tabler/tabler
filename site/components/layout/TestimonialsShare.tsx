import { escapeHtml, uiUrl } from '@/config/site';
import Icon from '@/components/Icon';

export default function TestimonialsShare() {
   const twitterUrl = `https://twitter.com/intent/tweet?url=${escapeHtml(
      uiUrl
   )}&via=codecalm&text=Tabler+-+Premium+dashboard+template+with+responsive+and+high+quality+UI`;

   return <>
      <div className="text-center mt-2">
         <a href={twitterUrl} className="btn btn-lg" target="_blank" rel="noopener noreferrer">
            <Icon name="heart" className="text-red" />
            Share the love with us!
         </a>
      </div>
   </>;
}
