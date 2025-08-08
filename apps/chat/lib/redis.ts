import { createClient } from "redis";
import type { ChatMessage } from "./types";
import { UIDataTypes, UIMessage, UITools } from "ai";

const REDIS_KEY_PREFIX = "shopify-chat";
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days in seconds

type RedisMessage = ChatMessage | UIMessage<unknown, UIDataTypes, UITools>;

export interface ChatSession {
	id: string;
	messages: RedisMessage[];
	lastUpdated: Date;
	title?: string;
	metadata?: Record<string, any>;
}

class RedisStorage {
	private client: ReturnType<typeof createClient> | null = null;
	private isConnected = false;

	async getClient() {
		if (!this.client) {
			const redisUrl = process.env.REDIS_URL;
			if (!redisUrl) {
				throw new Error("REDIS_URL environment variable is not set");
			}

			this.client = createClient({
				url: redisUrl,
			});

			this.client.on("error", (err) => {
				console.error("Redis Client Error:", err);
				this.isConnected = false;
			});

			this.client.on("connect", () => {
				console.log("Redis Client Connected");
				this.isConnected = true;
			});

			await this.client.connect();
		}

		return this.client;
	}

	private getSessionKey(sessionId: string): string {
		return `${REDIS_KEY_PREFIX}:session:${sessionId}`;
	}

	private getSessionListKey(): string {
		return `${REDIS_KEY_PREFIX}:sessions`;
	}

	async saveMessages(
		sessionId: string,
		messages: RedisMessage[],
	): Promise<void> {
		try {
			const client = await this.getClient();
			const session: ChatSession = {
				id: sessionId,
				messages,
				lastUpdated: new Date(),
				title: this.generateSessionTitle(messages),
			};

			const sessionKey = this.getSessionKey(sessionId);
			const sessionData = JSON.stringify(session);

			// Save session data with TTL
			await client.set(sessionKey, sessionData, {
				EX: SESSION_TTL,
			});

			// Add session ID to the list of sessions (for listing all sessions)
			await client.zAdd(this.getSessionListKey(), {
				score: Date.now(),
				value: sessionId,
			});
		} catch (error) {
			console.error("Failed to save messages to Redis:", error);
			throw error;
		}
	}

	async loadMessages(sessionId: string): Promise<RedisMessage[]> {
		try {
			const client = await this.getClient();
			const sessionKey = this.getSessionKey(sessionId);
			const sessionData = await client.get(sessionKey);

			if (!sessionData) {
				return [];
			}

			const session: ChatSession = JSON.parse(sessionData);
			return session.messages || [];
		} catch (error) {
			console.error("Failed to load messages from Redis:", error);
			return [];
		}
	}

	async getSession(sessionId: string): Promise<ChatSession | null> {
		try {
			const client = await this.getClient();
			const sessionKey = this.getSessionKey(sessionId);
			const sessionData = await client.get(sessionKey);

			if (!sessionData) {
				return null;
			}

			return JSON.parse(sessionData);
		} catch (error) {
			console.error("Failed to get session from Redis:", error);
			return null;
		}
	}

	async getAllSessions(): Promise<ChatSession[]> {
		try {
			const client = await this.getClient();

			// Get all session IDs ordered by score (timestamp)
			const sessionIds = await client.zRange(this.getSessionListKey(), 0, -1, {
				REV: true,
			});

			const sessions: ChatSession[] = [];

			for (const sessionId of sessionIds) {
				const session = await this.getSession(sessionId);
				if (session) {
					sessions.push(session);
				}
			}

			return sessions;
		} catch (error) {
			console.error("Failed to get all sessions from Redis:", error);
			return [];
		}
	}

	async deleteSession(sessionId: string): Promise<void> {
		try {
			const client = await this.getClient();
			const sessionKey = this.getSessionKey(sessionId);

			// Delete the session data
			await client.del(sessionKey);

			// Remove from sessions list
			await client.zRem(this.getSessionListKey(), sessionId);
		} catch (error) {
			console.error("Failed to delete session from Redis:", error);
			throw error;
		}
	}

	async clearAllSessions(): Promise<void> {
		try {
			const client = await this.getClient();

			// Get all session IDs
			const sessionIds = await client.zRange(this.getSessionListKey(), 0, -1);

			// Delete all session data
			for (const sessionId of sessionIds) {
				await client.del(this.getSessionKey(sessionId));
			}

			// Clear the sessions list
			await client.del(this.getSessionListKey());
		} catch (error) {
			console.error("Failed to clear all sessions from Redis:", error);
			throw error;
		}
	}

	private generateSessionTitle(messages: RedisMessage[]): string {
		// Try to generate a meaningful title from the first user message
		const firstUserMessage = messages.find(m => m.role === "user");
		if (firstUserMessage && firstUserMessage.parts) {
			const textPart = firstUserMessage.parts.find(p => p.type === "text");
			if (textPart && "text" in textPart) {
				const text = textPart.text;
				// Truncate to a reasonable length for a title
				return text.length > 50 ? text.substring(0, 50) + "..." : text;
			}
		}

		return `Chat ${new Date().toLocaleDateString()}`;
	}

	async disconnect(): Promise<void> {
		if (this.client && this.isConnected) {
			await this.client.quit();
			this.isConnected = false;
		}
	}
}

export const redisStorage = new RedisStorage();