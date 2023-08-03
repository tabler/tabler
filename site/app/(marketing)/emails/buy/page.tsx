import { emailsDownloadUrl } from '@/config/site';
import { redirect } from 'next/navigation';

export default function EmailsBuyPage() {
  redirect(emailsDownloadUrl);
}
