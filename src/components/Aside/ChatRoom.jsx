import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

export default function ChatRoom({ place }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const roomId = `chat-${place._id}`;

    useEffect(() => {
        if (token) {
            axios.get('/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Not authenticated', error);
            });
        }

        // 메세지 초기화 -> 추후 메세지 불러오기로 변경
        setMessages([]); 

        // Pusher 클라이언트 설정
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe(`${roomId}`);
        channel.bind('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => {
            pusher.unsubscribe(`${roomId}`);
        };
    }, [ place ]);

    const sendMessage = async () => {
        if (input.trim()) {
            const message = `${user.nickname}: ${input}`;
            await axios.post('/api/message', { roomId, message: message });
            setInput(''); // 입력 필드 초기화
        }
    };

    return (
        <div>
            { place.name } { roomId }
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
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}