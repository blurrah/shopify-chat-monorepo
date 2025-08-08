import { ProductCarouselComponent } from '@/components/product-carousel';
import { RemoteComponent } from 'remote-components/next';

export default async function ProductCarouselPage({ params }: { params: Promise<{ data: string }> }) {
  console.log("ProductCarouselPage called");
  const { data } = await params;
  const decodedData = decodeURIComponent(data);
  const parsedData = JSON.parse(decodedData);
  return (
    <RemoteComponent name="product-carousel">
      <ProductCarouselComponent products={parsedData} />
    </RemoteComponent>
    );
}