import { emailsDownloadUrl, emailsPrice, emailsSampleDownloadUrl } from '@/config/site';
import CTABanner from '@/components/CTABAnner';

export default function CTABannerEmails() {
  return (
    <CTABanner
      title="Ready to download?"
      description="Look like a PRO in every inbox. Start with one of our templates!"
      buttonHref={emailsDownloadUrl}
      buttonText={`Download for $${emailsPrice}`}
      buttonSecondaryHref={emailsSampleDownloadUrl}
      buttonSecondaryText="Get free sample"
    />
  );
}
