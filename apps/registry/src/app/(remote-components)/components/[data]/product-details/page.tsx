import { RemoteComponent } from "remote-components/next";
import { ProductDetailsServerComponent } from "@/components/product-details-server";

export default async function ProductDetailsPage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("ProductDetailsPage called");
	const { data } = await params;
	const decodedData = decodeURIComponent(data);
	let parsedData;
	try {
		parsedData = JSON.parse(decodedData);
	} catch (error) {
		console.error(error);
		parsedData = undefined;
	}
	return (
		<RemoteComponent name="product-details">
			<ProductDetailsServerComponent product={parsedData} />
		</RemoteComponent>
	);
}
