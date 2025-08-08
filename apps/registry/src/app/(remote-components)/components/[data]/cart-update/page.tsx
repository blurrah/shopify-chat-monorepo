import { RemoteComponent } from "remote-components/next";
import { CartUpdatedComponent } from "@/components/cart-updated";

export default async function ProductCarouselPage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("ProductCarouselPage called");
	const { data } = await params;
	const decodedData = decodeURIComponent(data);
	console.log({ decodedData });
	return (
		<RemoteComponent name="cart-update">
			<CartUpdatedComponent />
		</RemoteComponent>
	);
}
