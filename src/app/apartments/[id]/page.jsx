import RoomDetail from './RoomDetail';
import properties from '../../../../public/data/properties.json';

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default function RoomDetailPage({ params }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) return <div>Not found</div>;
  return <RoomDetail property={property} />;
}
