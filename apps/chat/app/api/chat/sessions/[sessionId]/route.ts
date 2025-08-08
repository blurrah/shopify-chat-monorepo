import { NextRequest, NextResponse } from "next/server";
import { redisStorage } from "@/lib/redis";
import type { ChatMessage } from "@/lib/types";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ sessionId: string }> }
) {
	try {
		const { sessionId } = await params;
		const session = await redisStorage.getSession(sessionId);
		
		if (!session) {
			return NextResponse.json(
				{ error: "Session not found" },
				{ status: 404 }
			);
		}
		
		return NextResponse.json({ session });
	} catch (error) {
		console.error("Failed to get session:", error);
		return NextResponse.json(
			{ error: "Failed to get session" },
			{ status: 500 }
		);
	}
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ sessionId: string }> }
) {
	try {
		const { sessionId } = await params;
		const { messages }: { messages: ChatMessage[] } = await req.json();
		
		if (!messages || !Array.isArray(messages)) {
			return NextResponse.json(
				{ error: "Messages array is required" },
				{ status: 400 }
			);
		}
		
		await redisStorage.saveMessages(sessionId, messages);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to save messages:", error);
		return NextResponse.json(
			{ error: "Failed to save messages" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ sessionId: string }> }
) {
	try {
		const { sessionId } = await params;
		await redisStorage.deleteSession(sessionId);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to delete session:", error);
		return NextResponse.json(
			{ error: "Failed to delete session" },
			{ status: 500 }
		);
	}
}