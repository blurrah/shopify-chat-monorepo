import { NextRequest, NextResponse } from "next/server";
import { redisStorage } from "@/lib/redis";

export async function GET() {
	try {
		const sessions = await redisStorage.getAllSessions();
		return NextResponse.json({ sessions });
	} catch (error) {
		console.error("Failed to get sessions:", error);
		return NextResponse.json(
			{ error: "Failed to get sessions" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get("sessionId");
		
		if (!sessionId) {
			return NextResponse.json(
				{ error: "Session ID is required" },
				{ status: 400 }
			);
		}
		
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