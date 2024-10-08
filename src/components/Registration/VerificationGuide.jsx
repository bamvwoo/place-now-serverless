import { useNavigate } from "react-router-dom";
import FormButton from "../Common/Button/FormButton";
import ResultContent from "../Common/ResultContent";
import styled from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../Common/Wrapper";

const Wrapper = styled(VerticalWrapper)`
    width: 400px;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    gap: 100px;

    & > div {
        width: 100%;
    }
`;

const ButtonWrapper = styled(HorizontalWrapper)`
    width: 100%;
    gap: 10px;

    & > button {
        width: 50%;
    }
`;

export default function VerificationGuide() {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <ResultContent 
                fail={ { "title": "이메일 인증이 필요해요", "subTitle" : "인증된 사용자만 장소를 등록할 수 있어요" } }
                loop="false"
            />

            <ButtonWrapper>
                <FormButton direction="prev" size="l" text="다음에 하기" icon={ false } onClick={ () => navigate(-1) } />
                <FormButton direction="next" size="l" text="인증하기" onClick={ () => navigate('/verification') } />
            </ButtonWrapper>
        </Wrapper>
    )
}