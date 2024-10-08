import FormInput from "./FormInput";
import { useEffect, useRef, useState } from "react";
import useGetEmailVerificationForm from "../../../hooks/useGetEmailVerificationForm";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import FormButton from "../Button/FormButton";

export default function EmailVerifier({ isSent, setIsSent, onSuccess, onFail }) {

    const { trigger, getValues, setValue } = useFormContext();
    const { email, verificationCode, isVerified } = useGetEmailVerificationForm();

    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ expirationTime, setExpirationTime ] = useState(0);

    const timerRef = useRef(null);

    const sendCode = async (e) => {
        setIsSent(false);
        setExpirationTime(0);
        setIsProcessing(true);

        const isValid = await trigger('email');
        if (!isValid) {
            setIsProcessing(false);
            return;
        }
        
        axios.get('/api/verification', {
            params: {
                receiver: getValues('email')
            }
        }).then(response => {
            setIsSent(true);
            setIsProcessing(false);
            setExpirationTime(new Date(response.data.expirationDate).getTime());
        });
    };

    const verifyCode = async (e) => {
        setIsProcessing(true);

        const isValid = await trigger('verificationCode');

        setIsProcessing(false);

        if (isValid) {
            setValue('isVerified', true);

            if (onSuccess) {
                onSuccess(email);
            }
        } else {
            setValue('isVerified', false);

            if (onFail) {
                onFail();
            }
        }
    };

    useEffect(() => {
        let intervalId;
        if (expirationTime) {
            intervalId = setInterval(() => {
                const now = new Date().getTime();
                const distance = expirationTime - now;

                if (distance <= 0 || !timerRef.current) {
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
                    timerRef.current.textContent = `(${textContent})`;
                }
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        }
    }, [ expirationTime, isSent, isProcessing ]);

    return (
        <>
            <FormInput type="text" size="l"
                field={ email } 
                readOnly={ isProcessing || getValues('isVerified') } 
            />

            {
                !getValues('isVerified') &&
                    <>
                        <FormButton type="button" width="100%" direction={ isSent ? "prev" : null } onClick={ sendCode } disabled={ isProcessing }>
                            {
                                isSent ?
                                    "재전송" :
                                isProcessing ?
                                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                                    "인증코드 전송"
                            }
                        </FormButton>

                        {
                            isSent &&
                                <FormInput type="text" size="l" 
                                    field={ verificationCode }
                                    readOnly={ isProcessing }
                                />
                        }

                        <FormInput type="hidden" size="l" field={ isVerified } />

                        {
                            isSent &&
                                <FormButton type="button" width="100%" onClick={ verifyCode } disabled={ isProcessing }>
                                    {
                                        isProcessing ?
                                            <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                                            <>
                                                인증코드 확인<span ref={ timerRef }></span>
                                            </>
                                    }
                                </FormButton>
                        }
                    </>
            }
        </>
    )
}