import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    let roomId = "1234";

    useEffect(() => {
        // Pusher 클라이언트 설정
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
          cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });

        console.log(pusher);
    
        const channel = pusher.subscribe(`chat-${roomId}`);
        channel.bind('message', (data) => {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        });
    
        return () => {
          pusher.unsubscribe(`chat-${roomId}`);
        };
      }, [roomId]);
    
      const sendMessage = async () => {
        if (input.trim()) {
          await axios.post('/api/message', { roomId, message: input });
          setInput(''); // 입력 필드 초기화
        }
      };

    return (
        <section>
            <div>
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
        </section>
    )
}