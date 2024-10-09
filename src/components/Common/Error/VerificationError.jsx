import { useNavigate } from "react-router-dom";
import FormButton from "../Button/FormButton";
import ResultContent from "../ResultContent";
import { ButtonWrapper } from "../../../pages/Error";
import { useEffect } from "react";

export default function VerificationError({ from }) {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('verificationSuccessUrl', from);
    }, []);

    return (
        <>
            <ResultContent 
                fail={ { "title": "이메일 인증이 필요해요", "subTitle" : "인증된 사용자만 장소를 등록할 수 있어요" } }
                loop="false"
            />

            <ButtonWrapper>
                <FormButton direction="prev" size="l" text="다음에 하기" icon={ false } onClick={ () => navigate(-1) } />
                <FormButton direction="next" size="l" text="인증하기" onClick={ () => navigate('/verification') } />
            </ButtonWrapper>
        </>
    )
}