import { useEffect, useRef, useState } from "react";
import { axiosInstance, useAuth } from "../context/AuthContext";
import Form from "../components/Common/Form/Form";
import { useForm } from "react-hook-form";
import FormInput from "../components/Common/Form/FormInput";
import useGetIdentificationForm from "../hooks/useGetVerificationForm";
import { VerticalWrapper } from "../components/Common/Wrapper";
import styled from "styled-components";
import FormButton from "../components/Common/Button/FormButton";
import ResultContent from "../components/Common/ResultContent";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    gap: 10px;

    & > h2 {
        font-size: 1.8rem;
        font-weight: 700;
        align-self: flex-start;
        margin-bottom: 20px;
        line-height: 1.5;
    }

    & > button {
        width: 100%;
    }
`;

const RemainingTimeText = styled.span`
    padding: 0;
`;

export default function Verification() {

    const methods = useForm({ reValidateMode: "onBlur" });
    const { trigger, getValues, setValue } = methods;

    const { email, isEmailDuplicated, verificationCode, isVerified } = useGetIdentificationForm();

    const [ expirationTime, setExpirationTime ] = useState(0);

    const [ isSent, setIsSent ] = useState(false);
    const [ isProcessing, setIsProcessing ] = useState(false);

    const { refreshToken } = useAuth();

    const timerRef = useRef(null);

    const sendCode = async (e) => {
        setIsSent(false);
        setExpirationTime(0);

        const isValid = await trigger('email');
        if (!isValid) {
            return;
        }
        
        setIsProcessing(true);
        const receiver = getValues('email');

        try {
            const response = await axiosInstance.get('/api/identification', {
                params: {
                    receiver
                }
            });
            
            setIsSent(true);
            setExpirationTime(new Date(response.data.expirationDate).getTime());

            setValue("isEmailDuplicated", false);
        } catch (error) {
            setValue("isEmailDuplicated", true);
        }

        setIsProcessing(false);
    
        await trigger('isEmailDuplicated');
    };

    const verifyCode = async (e) => {
        const isValid = await trigger('verificationCode');
        if (!isValid) {
            return;
        }

        setIsProcessing(true);

        const email = getValues('email');
        const verificationCodeValue = getValues('verificationCode');

        try {
            const response = await axiosInstance.post('/api/identification', { email, verificationCodeValue });

            const result = response.data.result;
            if (result) {
                setValue('isVerified', true);
                refreshToken();
            } else {
                setValue('isVerified', false);
            }

            await trigger('isVerified');
        } catch (error) {
            console.error('Failed to send code', error);
        }

        setIsProcessing(false);
    };

    const onValid = async (data) => {
        
    };

    const onInvalid = (errors) => {

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
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="350px" height="100%">
            <Wrapper>
                {
                    getValues("isVerified") ? (
                        <>
                            <ResultContent success={{ title: "이메일 인증이 완료되었어요", subTitle: "이제 장소를 등록하거나 채팅방에 참여할 수 있어요" }} loop="false" />
                        </>
                    ) : (

                        <>
                            <h2>
                                {
                                    isSent ?
                                        <>이메일로 전송된<br />인증코드를 입력해주세요</> :
                                        <>인증코드를 받을<br />이메일 주소를 입력해주세요</>
                                }
                            </h2>

                            <FormInput type="text" size="l"
                                placeholder="이메일 주소"
                                field={ email } 
                                readOnly={ isProcessing } 
                            />

                            <FormInput type="hidden" size="l" field={ isEmailDuplicated } />

                            <FormButton type="button" direction={ isSent ? "prev" : null } onClick={ sendCode } disabled={ isProcessing }>
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
                                        placeholder="인증코드"
                                        field={ verificationCode }
                                        readOnly={ isProcessing }
                                    />
                            }

                            <FormInput type="hidden" size="l" field={ isVerified } />

                            {
                                isSent &&
                                    <FormButton type="button" onClick={ verifyCode } disabled={ isProcessing }>
                                        {
                                            isProcessing ?
                                                <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                                                <>
                                                    인증코드 확인<RemainingTimeText ref={ timerRef }></RemainingTimeText>
                                                </>
                                        }
                                    </FormButton>
                            }
                        </>
                    )
                }
            </Wrapper>
        </Form>
    )
}