import RoomDetail from './RoomDetail';
import properties from '../../../../public/data/properties.json';

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function RoomDetailPage({ params }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return <div>Not found</div>;
  return <RoomDetail property={property} />;
}
