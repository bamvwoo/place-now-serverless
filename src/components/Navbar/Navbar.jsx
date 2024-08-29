import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {

    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        setBtnClickAnimation();
    });

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
    }

    return (
        <nav>
            <div className="open-chat-btn">
                <span>NOW</span>
            </div>
            {
                isOpen ? (
                    <div></div>
                ) : null
            }
        </nav>
    )
}