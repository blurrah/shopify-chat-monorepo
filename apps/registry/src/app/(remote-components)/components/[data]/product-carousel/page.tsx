import { ProductCarouselComponent } from '@/components/product-carousel';
import { RemoteComponent } from 'remote-components/next';

export default function ProductCarouselPage() {
  return (
    <RemoteComponent name="product-carousel">
      <ProductCarouselComponent />
    </RemoteComponent>
    );
}