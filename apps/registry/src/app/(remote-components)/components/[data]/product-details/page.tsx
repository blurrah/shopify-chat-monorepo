import { ProductDetailsServerComponent } from '@/components/product-details-server';
import { RemoteComponent } from 'remote-components/next';

export default function ProductDetailsPage() {
  console.log("ProductDetailsPage called");
  return (
    <RemoteComponent name="product-details">
      <p>from remote component</p>
    <ProductDetailsServerComponent />
    </RemoteComponent>
    );
}