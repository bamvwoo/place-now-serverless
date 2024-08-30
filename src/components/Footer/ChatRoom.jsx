import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function ChatRoom({ roomId, quitRoom }) {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // 메세지 초기화 -> 추후 메세지 불러오기로 변경
        setMessages([]); 

        // Pusher 클라이언트 설정
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe(`${roomId}`);
        channel.bind('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);

            // 마지막 읽은 시간 업데이트
        });

        return () => {
            pusher.unsubscribe(`${roomId}`);
        };
    }, [ roomId ]);

    const sendMessage = async () => {
        if (input.trim()) {
            const message = `${user.name}: ${input}`;
            await axios.post('/api/message', { roomId, message: message });
            setInput(''); // 입력 필드 초기화
        }
    };

    return (
        <div>
            { roomId }
            <div className="chat-room">
                { 
                    messages.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))
                }
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={ sendMessage }>Send</button>
            <button onClick={ quitRoom }>Back</button>
        </div>
    )
}