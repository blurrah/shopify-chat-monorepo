import { RemoteComponent } from "remote-components/next";
import { CartComponent } from "@/components/cart";

export default async function ProductCarouselPage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("ProductCarouselPage called");
	//   const { data } = await params;
	//   const decodedData = decodeURIComponent(data);
	// const parsedData = JSON.parse(decodedData);
	return (
		<RemoteComponent name="cart">
			<p>Test :)</p>
			<CartComponent />
		</RemoteComponent>
	);
}
