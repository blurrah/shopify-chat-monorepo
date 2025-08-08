import { redisStorage } from "@/lib/redis";
import { notFound } from "next/navigation";
import { ServerChat } from "./server-chat";
import { ChatMessage } from "@/lib/types";

export default async function RemotePage({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
	const params = await searchParams;

    const id = params.id as string;

    if (!id) {
        console.error("No id provided");
        notFound();
    }


    const session = await redisStorage.loadMessages(id);
    if (!session) {
        console.error("No session found");
        notFound();
    }

    console.log(session);


	return <ServerChat messages={session as ChatMessage[]} />;
}