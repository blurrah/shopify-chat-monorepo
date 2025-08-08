"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";
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
import { MessageInput } from "./message-input";
import { MessagePartsHandler } from "./message-parts-handler";
import { OpeningScreen } from "./opening-screen";
import { SessionList } from "./session-list";

const CURRENT_CHAT_ID_KEY = "current-chat-id";

export function Chat({ isDebug = false }: { isDebug?: boolean }) {
	const [chatId, setChatId] = useState<string>("");
	const [isInitialized, setIsInitialized] = useState(false);
	
	// Initialize chat ID from localStorage
	useEffect(() => {
		const storedChatId = localStorage.getItem(CURRENT_CHAT_ID_KEY);
		if (storedChatId) {
			setChatId(storedChatId);
		} else {
			const newChatId = `chat-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
			localStorage.setItem(CURRENT_CHAT_ID_KEY, newChatId);
			setChatId(newChatId);
		}
		setIsInitialized(true);
	}, []);
	
	const { messages, sendMessage, status, setMessages } = useChat<ChatMessage>({
		id: chatId,
		body: {
			id: chatId,
		},
	});
	const [showOpeningScreen, setShowOpeningScreen] = useState(true);

	// Load messages from Redis when chat ID changes
	useEffect(() => {
		const loadMessages = async () => {
			if (!chatId || !isInitialized) return;
			
			try {
				const response = await fetch(`/api/chat/sessions/${chatId}`);
				if (response.ok) {
					const data = await response.json();
					if (data.session?.messages) {
						setMessages(data.session.messages);
						setShowOpeningScreen(data.session.messages.length === 0);
					} else {
						setShowOpeningScreen(true);
					}
				} else if (response.status === 404) {
					// Session doesn't exist yet, show opening screen
					setShowOpeningScreen(true);
				}
			} catch (error) {
				console.error("Failed to load messages:", error);
				setShowOpeningScreen(true);
			}
		};
		
		loadMessages();
	}, [chatId, isInitialized, setMessages]);

	const handleOpeningSubmit = (message: string) => {
		setShowOpeningScreen(false);
		sendMessage({ text: message });
	};

	const handleNewSession = () => {
		const newChatId = `chat-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
		localStorage.setItem(CURRENT_CHAT_ID_KEY, newChatId);
		setChatId(newChatId);
		setMessages([]);
		setShowOpeningScreen(true);
	};

	const handleSessionSelect = (targetSessionId: string) => {
		if (targetSessionId === chatId) return;
		localStorage.setItem(CURRENT_CHAT_ID_KEY, targetSessionId);
		setChatId(targetSessionId);
	};

	// Don't render until we've initialized the chat ID
	if (!isInitialized) {
		return null;
	}
	
	if (showOpeningScreen) {
		return <OpeningScreen onSubmit={handleOpeningSubmit} />;
	}

	return (
		<div className="flex flex-col h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-lg sm:text-xl font-semibold text-gray-900">
							Shopify AI Assistant {isDebug ? "DEBUG" : ""}
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<SessionList
							currentSessionId={chatId}
							onSessionSelect={handleSessionSelect}
							onNewSession={handleNewSession}
						/>
						<div className="text-sm text-gray-500 hidden sm:block">
							{messages.length} messages
						</div>
					</div>
				</div>
			</header>

			{/* Chat Content */}
			<AIConversation className="flex-1 relative">
				<AIConversationContent className="max-w-4xl mx-auto px-4 sm:px-6">
					{messages.map((message) => (
						<AIMessage
							from={message.role === "system" ? "assistant" : message.role}
							key={message.id}
							className="[&:has([data-slot='carousel'])>div]:max-w-[calc(100%-2rem)] [&:has([data-slot='product-details'])>div]:max-w-[calc(100%-2rem)] [&:has([data-slot='cart-update'])>div]:w-[calc(80%-2rem)]"
						>
							<AIMessageContent>
								<MessagePartsHandler
									parts={message.parts}
									sendMessage={sendMessage}
									isDebug={isDebug}
								/>
							</AIMessageContent>
						</AIMessage>
					))}
				</AIConversationContent>
				<AIConversationScrollButton />
			</AIConversation>

			{/* Footer */}
			<footer className="px-4 sm:px-6 pb-6">
				<div className="max-w-4xl mx-auto">
					<MessageInput sendMessage={sendMessage} status={status} />
				</div>
			</footer>
		</div>
	);
}
