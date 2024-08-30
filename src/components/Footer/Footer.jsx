import { useEffect, useState } from 'react';
import './Footer.css';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import ChatRoomList from './ChatRoomList';

export default function Footer() {
    const { user } = useAuth();
    const { unreadMessages } = useChat();
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        if (!user) return;

        const setBtnClickAnimation = () => {
            const openChatBtn = document.querySelector('.open-chat-btn');
            openChatBtn.addEventListener('click', () => {
                if (!openChatBtn.classList.contains("clicked")) {
                    openChatBtn.classList.add("clicked");
                    setTimeout(() => {
                        openChatBtn.classList.remove("clicked");
                    }, 500);
                }
            });
        };

        setBtnClickAnimation();

        return () => {
            const openChatBtn = document.querySelector('.open-chat-btn');
            if (openChatBtn) {
                openChatBtn.removeEventListener('click', setBtnClickAnimation);
            }
        };
    }, [ user ]);

    const toggleChatRoom = () => {
        setIsOpen(!isOpen);
    };

    if (!user) {
        return null;
    }

    return (
        <nav>
            <div className="open-chat-btn" onClick={ toggleChatRoom }>
                <span>NOW { unreadMessages }</span>
            </div>
            {
                isOpen ? (
                    <ChatRoomList />
                ) : null
            }
        </nav>
    )
}