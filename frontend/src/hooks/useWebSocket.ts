import { useEffect, useRef, useState } from "react";

type WebSocketMessage = any;

export function useWebSocket(url: string) {
	const [messages, setMessages] = useState<WebSocketMessage[]>([]);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const socketRef = useRef<WebSocket | null>(null);
	const reconnectAttempts = useRef<number>(0);
	const maxReconnectAttempts = 5;

	const connect = () => {
		const ws = new WebSocket(url);

		ws.onopen = () => {
			setIsConnected(true);
			reconnectAttempts.current = 0;
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				setMessages((prev) => [...prev, data]);
			} catch (e) {
				setMessages((prev) => [...prev, event.data]);
			}
		};

		ws.onclose = () => {
			setIsConnected(false);
			if (reconnectAttempts.current < maxReconnectAttempts) {
				const timeout = Math.min(
					1000 * Math.pow(2, reconnectAttempts.current),
					30000
				);
				setTimeout(connect, timeout);
				reconnectAttempts.current++;
			}
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		socketRef.current = ws;
	};

	useEffect(() => {
		connect();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, [url]);

	return {
		messages,
		setMessages,
		isConnected,
	};
}
