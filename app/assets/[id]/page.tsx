import AssetDetails from "@/components/assets-details";

interface AssetDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params; // unwrap params since it's a Promise
  return <AssetDetails id={id} />;
}
