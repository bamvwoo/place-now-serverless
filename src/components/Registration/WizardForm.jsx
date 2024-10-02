import { useForm } from "react-hook-form";
import Form from "../Common/Form/Form";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WizardStepOne from "./WizardSteps/WizardStepOne";
import { HorizontalWrapper, VerticalWrapper } from "../Common/Wrapper";
import WizardStepTwo from "./WizardSteps/WizardStepTwo";
import WizardStepThree from "./WizardSteps/WizardStepThree";
import ResultContent from "../Common/ResultContent";
import { axiosInstance } from "../../context/AuthContext";
import WizardStepFour from "./WizardSteps/WizardStepFour";

const StepWrapper = styled(VerticalWrapper)`
    width: 100%;
    flex: 1;
    justify-content: flex-start;
    gap: 15px;
`;

export const StepTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 20px;
    line-height: 1.5;
`;

export const StepButtonWrapper = styled(HorizontalWrapper)`
    width: 100%;
    margin-top: auto;
    padding-bottom: 10px;
    gap: 10px;
    flex-self: flex-end;
    justify-content: flex-end;

    & > button {
        width: 50%;
    }
`;

export default function WizardForm() {
    const methods = useForm({ reValidateMode: "onBlur" });

    const [ step, setStep ] = useState(1);
    const [ animationDelay, setAnimationDelay ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);

    const wrapperRef = useRef(null);

    const onValid = async (data) => {
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

        await axiosInstance.post('/api/place', formData);

        setIsLoading(false);
        setStep(4);
    };

    const onInvalid = (errors) => {

    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (wrapperRef.current) {
                wrapperRef.current.querySelectorAll("& > *").forEach((element, index) => {
                    element.style.opacity = 0;
                    element.style.animation = `fadeIn .5s ease-in-out ${animationDelay + index * 0.1}s forwards`;

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
            <StepWrapper ref={ wrapperRef }>
                { step === 1 &&  <WizardStepOne setStep={ setStep } /> }
                { step === 2 &&  <WizardStepTwo setStep={ setStep } /> }
                { step === 3 && !isLoading && <WizardStepThree setStep={ setStep } /> }
                { step === 3 && isLoading && <ResultContent loading={ true } /> }
                { step === 4 && <WizardStepFour /> }
            </StepWrapper>
        </Form>
    )  
}