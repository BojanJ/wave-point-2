import { getPageMetadata } from '@/lib/seoMetadata';
import HomeClient from './HomeClient';

export const metadata = getPageMetadata('home', 'en', '/');

export default function HomePage() {
  return <HomeClient />;
}
