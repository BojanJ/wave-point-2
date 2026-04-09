import { getPageMetadata } from '@/lib/seoMetadata';
import GalleryClient from './GalleryClient';

export const metadata = getPageMetadata('gallery', 'en', '/gallery');

export default function GalleryPage() {
  return <GalleryClient />;
}
