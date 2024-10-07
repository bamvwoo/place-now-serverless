import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";
import Form from "./Form";
import styled from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../Wrapper";

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

export default function WizardForm({ children, methods, onValid, onInvalid, width, height, step, setStep }) {

    const wrapperRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (wrapperRef.current) {
                wrapperRef.current.querySelectorAll("& > *").forEach((element, index) => {
                    element.style.opacity = 0;
                    element.style.animation = `fadeIn .5s ease-in-out ${index * 0.1}s forwards`;

                    setTimeout(() => {
                        element.style.opacity = 1;
                    }, 1000 + index * 0.2);
                });
            }
        }, 0); // 0ms의 딜레이를 주어 상태 업데이트와 DOM 업데이트가 완료된 후 실행

        return () => clearTimeout(timeoutId); // 클린업 함수로 타임아웃을 정리
    }, [ step ]);

    // children에 setStep 주입
    const enhancedChildren = Children.map(children, child => {
        // 자식 요소가 유효한 React 요소인지 확인
        if (isValidElement(child)) {
            return cloneElement(child, { setStep });
        }
        return child;
    });

    return (
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="500px" height="100%">
            <StepWrapper ref={ wrapperRef }>
                { enhancedChildren }
            </StepWrapper>
        </Form>
    )
}