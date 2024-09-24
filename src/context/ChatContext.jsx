import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const [ unreadMessages, setUnreadMessages ] = useState(0);
  const [ chatRooms, setChatRooms ] = useState([
    { roomId: 'chat-001' },
    { roomId: 'chat-002' },
    { roomId: 'chat-003' },
    { roomId: 'chat-004' }
  ]);

  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => {
      let count = 0;
      chatRooms.forEach(room => {
        count += Math.floor(Math.random() * 10);
      });
      setUnreadMessages(count);
    }, 1000);

    // Cleanup 함수에서 인터벌 해제
    return () => clearInterval(intervalId);
  }, [ user ]);

  const subscribe = (place) => {
    setChatRooms([
      ...chatRooms,
      { roomId: `chat-${place._id}` }
    ]);
  };

  const unsubscribe = (place) => {
    setChatRooms(chatRooms.filter(room => room.roomId !== `chat-${place._id}`));
  };

  return (
    <ChatContext.Provider value={{ chatRooms, unreadMessages, subscribe, unsubscribe }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}