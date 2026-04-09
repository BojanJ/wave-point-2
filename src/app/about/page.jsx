import { getPageMetadata } from '@/lib/seoMetadata';
import AboutClient from './AboutClient';

export const metadata = getPageMetadata('about', 'en', '/about');

export default function AboutPage() {
  return <AboutClient />;
}
