import { RemoteComponent } from "remote-components/next";
import { CartComponent } from "@/components/cart";

export default async function CartPage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("CartPage called");
	const { data } = await params;
	const decodedData = decodeURIComponent(data);
	console.log({ decodedData });
	const parsedData = JSON.parse(decodedData);
	return (
		<RemoteComponent name="cart">
			<CartComponent cart={parsedData} />
		</RemoteComponent>
	);
}
