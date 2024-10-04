import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../context/AuthContext";

export default function Identification() {

    const [ expirationTime, setExpirationTime ] = useState(0);
    const [ isSent, setIsSent ] = useState(false);

    const timerRef = useRef(null);

    const sendCode = async (e) => {
        const receiver = e.target.previousElementSibling.value;
        
        try {
            const response = await axiosInstance.get('/api/identification', {
                params: {
                    receiver
                }
            });

            if (response.status === 200) {
                setIsSent(true);
                setExpirationTime(new Date(response.data.expirationDate).getTime());
            }
        } catch (error) {
            console.error('Failed to send code', error);
        }
    };

    const verifyCode = async (e) => {
        
    };

    useEffect(() => {
        if (expirationTime) {
            const intervalId = setInterval(() => {
                const now = new Date().getTime();
                const distance = expirationTime - now;

                if (distance <= 0) {
                    clearInterval(intervalId);
                    setIsSent(false);
                    setExpirationTime(0);
                } else {
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    let textContent = `${seconds}초`;
                    if (minutes > 0) {
                        textContent = `${minutes}분 ${textContent}`;
                    }
                    timerRef.current.textContent = `남은 시간 : ${textContent}`;
                }
            }, 1000);
        }
    }, [ expirationTime ]);

    return (
        <div>
            <input type="email" name="receiver" />

            {
                isSent &&
                <>
                    <input type="text" name="code" />
                    <span ref={ timerRef }></span>
                </>
            }

            {
                isSent ? (
                    <button onClick={ verifyCode }>인증확인</button>
                ) : (
                    <button onClick={ sendCode }>인증코드 발송</button>
                )
            }
        </div>
    )
}