import { MOCK_PROPERTIES } from "@/data/properties";
import { PropertyDetailsClient } from "@/components/property/PropertyDetailsClient";

export function generateStaticParams() {
  return MOCK_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <PropertyDetailsClient id={resolvedParams.id} />;
}
