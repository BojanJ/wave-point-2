import { getPageMetadata } from '@/lib/seoMetadata';
import AreaClient from './AreaClient';

export const metadata = getPageMetadata('area', 'en', '/area');

export default function AreaPage() {
  return <AreaClient />;
}
