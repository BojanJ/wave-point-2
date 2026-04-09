import { getPageMetadata } from '@/lib/seoMetadata';
import ApartmentsClient from './ApartmentsClient';

export const metadata = getPageMetadata('apartments', 'en', '/apartments');

export default function ApartmentsPage() {
  return <ApartmentsClient />;
}
