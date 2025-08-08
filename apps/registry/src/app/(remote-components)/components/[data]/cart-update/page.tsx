import { RemoteComponent } from "remote-components/next";
import { CartUpdatedComponent } from "@/components/cart-updated";

export default async function CartUpdatePage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("CartUpdatePage called");
	const { data } = await params;
	const decodedData = decodeURIComponent(data);
	const parsedData = JSON.parse(decodedData);
	return (
		<RemoteComponent name="cart-update">
			<CartUpdatedComponent cart={parsedData} />
		</RemoteComponent>
	);
}
