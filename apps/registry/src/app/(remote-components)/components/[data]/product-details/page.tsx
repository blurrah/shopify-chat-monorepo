import { RemoteComponent } from "remote-components/next";
import { ProductDetailsServerComponent } from "@/components/product-details-server";

export default async function ProductDetailsPage({
	params,
}: {
	params: Promise<{ data: string }>;
}) {
	console.log("ProductDetailsPage called");
	const { data } = await params;
	let parsedData;
	try {
		const decodedData = decodeURIComponent(data);
		parsedData = JSON.parse(decodedData);
		console.log("parsedData", parsedData);
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
