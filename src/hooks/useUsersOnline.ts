import { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';

export const useUsersOnline = () => {
  const [userCount, setUserCount] = useState(0);
  // Setup WebSocket connection using react-use-websocket
  const { lastMessage } = useWebSocket('ws://localhost:3002', {
    onOpen: () => console.log('WebSocket Connected'),
    onClose: () => console.log('WebSocket Disconnected'),
    shouldReconnect: (closeEvent:CloseEvent) => true, // Auto-reconnect
    // Additional options can be added here
  });
  // Effect to handle incoming messages
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setUserCount(data.userCount);
    }
  }, [lastMessage]);
  return { userCount };
};
