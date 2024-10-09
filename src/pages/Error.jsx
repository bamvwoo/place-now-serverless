import styled from "styled-components";
import ResultContent from "../components/Common/ResultContent";
import { useLocation, useNavigate } from "react-router-dom";
import AuthError from "../components/Common/Error/AuthError";
import VerificationError from "../components/Common/Error/VerificationError";
import { HorizontalWrapper, VerticalWrapper } from "../components/Common/Wrapper";
import FormButton from "../components/Common/Button/FormButton";
import { useEffect } from "react";

export const ErrorWrapper = styled(VerticalWrapper)`
    width: 400px;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    gap: 100px;

    & > div {
        width: 100%;
    }
`;

export const ButtonWrapper = styled(HorizontalWrapper)`
    width: 100%;
    gap: 10px;

    & > button {
        width: 50%;
    }
`;

export default function Error() {

    const navigate = useNavigate();
    const location = useLocation();
    const { status, message, from } = location.state || { status: 500, message: '알 수 없는 문제가 발생했어요', from: '/' };

    useEffect(() => {
        console.log(status, message, from);
    }, [status, message, from]);

    return (
        <ErrorWrapper>
            {status === 401 ? (
                <AuthError from={ from } />
            ) : status === 403 ? (
                <VerificationError from={ from } />
            ) : (
                <>
                    <ResultContent 
                        fail={{ "title": message }}
                        loop="false"
                    />
        
                    <ButtonWrapper>
                        <FormButton direction="prev" size="l" text="이전 화면으로" icon={ false } onClick={ () => navigate(-1) } />
                        <FormButton direction="next" size="l" text="홈으로" icon={ false } onClick={ () => navigate('/') } />
                    </ButtonWrapper>
                </>
            )}
        </ErrorWrapper>
    );
}