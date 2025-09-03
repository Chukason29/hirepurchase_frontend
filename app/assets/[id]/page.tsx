import AssetDetails from "@/components/assets-details";

export default function AssetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <AssetDetails id={params.id} />;
}
