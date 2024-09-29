import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../components/Registration/ImageUploader";
import AddressSelector from "../components/Registration/AddressSelector";
import { axiosInstance } from "../context/AuthContext";
import ResultContent from "../components/Common/ResultContent";
import { useNavigate } from "react-router-dom";
import Form from "../components/Common/Form/Form";
import styled from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../components/Common/Wrapper";
import FormInput from "../components/Common/Form/FormInput";
import FormButton from "../components/Common/Button/FormButton";
import Tooltip from "../components/Common/Tooltip";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;
    justify-content: flex-start;
`;

const StepWrapper = styled(VerticalWrapper)`
    width: 100%;
    flex: 1;
    justify-content: flex-start;
    gap: 15px;
`;

const StepTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 20px;
    line-height: 1.5;
`;

const ButtonWrapper = styled(HorizontalWrapper)`
    width: 100%;
    margin-top: auto;
    padding-bottom: 10px;
    gap: 10px;
    justify-content: flex-end;

    & > button {
        width: 50%;
    }
`;

export default function Registration() {
    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues, formState: { errors } } = methods;

    const navigate = useNavigate();

    const [ step, setStep ] = useState(1);
    const [ animationDelay, setAnimationDelay ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);

    const wrapperRef = useRef(null);

    const onValid = (data) => {
        console.log(data);

        if (step === 3) {
            setIsLoading(true);

            const formData = new FormData();
            for (const key in data) {
                if (key === 'images') {
                    Array.from(data[key]).forEach(file => {
                        formData.append('images', file);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }

            axiosInstance.post('/api/place', formData)
            .then((response) => {
                setIsLoading(false);
                setStep(step + 1);
            });
        } else if (step === 4) {
            navigate('/');
        } else {
            setAnimationDelay(0);
            setStep(step + 1);
        }
    };

    const onInvalid = (errors) => {
        for (const key in errors) {
            // errors[key].ref
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (wrapperRef.current) {
                wrapperRef.current.querySelectorAll("& > *").forEach((element, index) => {
                    element.style.opacity = 0;
                    element.style.animation = `fadeIn .5s ease-in-out ${animationDelay + index * 0.2}s forwards`;

                    setTimeout(() => {
                        element.style.opacity = 1;
                    }, 1000 + animationDelay + index * 0.2);
                });
            }
        }, 0); // 0ms의 딜레이를 주어 상태 업데이트와 DOM 업데이트가 완료된 후 실행

        return () => clearTimeout(timeoutId); // 클린업 함수로 타임아웃을 정리
    }, [ step ]);

    return (
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="400px" height="100%">
            <Wrapper ref={ wrapperRef }>
            {
                step === 1 && (
                    <StepWrapper>
                        <StepTitle>이 장소가 어디에 있나요?</StepTitle>
                        <AddressSelector />
                    </StepWrapper>
                )
            }

            {
                step === 2 && (
                    <StepWrapper>
                        <StepTitle>장소의 이름을 입력해주세요</StepTitle>
                        <FormInput 
                            type="text" name="name"
                            placeholder="장소명"
                            required="장소명을 입력해주세요"
                            maxLength={{ 
                                value: 50, 
                                message: '장소명은 최대 50자까지 입력할 수 있어요' 
                            }}
                            defaultValue={ getValues("detailedAddress") }
                            size="l"
                        />

                        <FormInput 
                            type="checkbox" name="isAdmin" 
                            label={ <Tooltip title="이 장소의 관리자예요" text="이 장소의 관리자는 할 수 있어요." /> }
                            size="l"
                        />
                    </StepWrapper>
                )
            }

            {
                step === 3 && !isLoading && (
                    <StepWrapper>
                        <StepTitle>장소의 이미지를 첨부하고<br />썸네일을 선택해주세요</StepTitle>
                        <ImageUploader required="장소 이미지를 첨부해주세요" thumbnailEnabled={ true } />
                    </StepWrapper>
                )
            }

            {
                step === 3 && isLoading && (
                    <ResultContent loading={ true } />
                )
            }

            {
                step === 4 && (
                    <ResultContent success={
                        { 
                            title: "등록 신청이 완료되었어요", 
                            subTitle: "등록이 승인되면 이메일로 알려드릴게요" 
                        }}
                        loop="false"
                    />
                )
            }

            { 
                !isLoading && (
                    <ButtonWrapper>
                        {
                            <FormButton type="button" $size="l" 
                                text={ 
                                    step === 1 ? 
                                        "취소" :
                                    step === 4 ?
                                        "완료" :
                                        null
                                    }
                                icon={
                                    step !== 1 && step !== 4 
                                }
                                onClick={ () => { 
                                    step === 1 || step === 4 ? 
                                        navigate('/') : 
                                        setStep(step - 1)
                                } 
                            } />
                        }

                        {
                            step < 4 && 
                                <FormButton type="submit" $size="l" complete={ step === 3 } />
                        }
                    </ButtonWrapper>
                )
            }
            </Wrapper>
        </Form>
    )
}