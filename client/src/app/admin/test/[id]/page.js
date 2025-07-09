export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function ProductPage({ params }) {
  const { id } = params;

  return <div>Static Product Page — ID: {id}</div>;
}