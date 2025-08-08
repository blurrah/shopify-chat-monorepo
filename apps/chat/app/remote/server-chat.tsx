import { RemoteComponent } from "remote-components/next/host";
import { Markdown } from "@/components/markdown";
import {
	AIConversation,
	AIConversationContent,
	AIConversationScrollButton,
} from "@/components/ui/kibo-ui/ai/conversation";
import {
	AIMessage,
	AIMessageContent,
} from "@/components/ui/kibo-ui/ai/message";
import type { ChatMessage } from "@/lib/types";

export function ServerChat({ messages }: { messages: ChatMessage[] }) {
	return (
		<div className="flex flex-col h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<h1 className="text-lg sm:text-xl font-semibold text-gray-900">
						Shopify AI Assistant Remote components
					</h1>
				</div>
			</header>
			{/* Chat Content */}
			<AIConversation className="flex-1 relative">
				<AIConversationContent className="max-w-4xl mx-auto px-4 sm:px-6">
					{messages.map((message) => (
						<AIMessage
							from={message.role === "system" ? "assistant" : message.role}
							key={message.id}
							className="[&:has([data-slot='carousel'])>div]:max-w-[calc(100%-2rem)] [&:has([data-slot='product-details'])>div]:max-w-[calc(100%-2rem)] [&:has([data-slot='cart-update'])>div]:w-[calc(80%-2rem)] *:max-w-full"
						>
							<AIMessageContent>
								<ServerMessagePartsHandler parts={message.parts} />
							</AIMessageContent>
						</AIMessage>
					))}
				</AIConversationContent>
				<AIConversationScrollButton />
			</AIConversation>
		</div>
	);
}

function ServerMessagePartsHandler({ parts }: { parts: ChatMessage["parts"] }) {
	return (
		<div className="space-y-4">
			{parts.map((part) => {
				console.log(part);
				if (part.type === "text") {
					return <Markdown key={part.text}>{part.text}</Markdown>;
				}

				if (part.type === "dynamic-tool") {
					const status =
						part.state === "output-available"
							? "completed"
							: part.state === "output-error"
								? "error"
								: "running";
					const isCompleted = status === "completed";
					const hasOutput = part.output !== undefined;

					const output = part.output as {
						remoteComponent?: string;
						products?: unknown[];
						product?: unknown;
						cart?: unknown;
					};

					if (isCompleted && hasOutput && output.remoteComponent) {
						const componentHandlers: Array<{
							suffix: string;
							selectPayload: (o: typeof output) => unknown;
						}> = [
							{
								suffix: "/product-carousel",
								selectPayload: (o) => o.products,
							},
							{
								suffix: "/product-details",
								selectPayload: (o) => o.product,
							},
							{
								suffix: "/cart-update",
								selectPayload: (o) => o.cart,
							},
							{
								suffix: "/cart",
								selectPayload: (o) => o.cart,
							},
						];

						const remoteComponent = output.remoteComponent || "";
						const matched = componentHandlers.find((h) =>
							remoteComponent.endsWith(h.suffix),
						);

						if (matched) {
							const payload = matched.selectPayload(output);
							const data = encodeURIComponent(JSON.stringify(payload));
							const componentPath = remoteComponent.replace("<data>", data);
							return (
								<div key={part.toolCallId}>
									<RemoteComponent src={componentPath} />
								</div>
							);
						}
					}
				}

				return null;
			})}
		</div>
	);
}
