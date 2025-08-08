import { Chat } from "@/components/chat";
import { debugFlag } from "@/lib/flags";
import { RemoteComponent } from "remote-components/next/host";

export default async function Home() {
	// TODO: Add precompute path for static chat view
	const isDebug = await debugFlag();

	return (
		<div className="h-screen w-full">
			<div className="flex flex-col gap-4 bg-white">
				<RemoteComponent src="/components/bla/product-details" />
			</div>
			<Chat isDebug={isDebug} />
		</div>
	);
}
