import styled from "styled-components";
import ResultContent from "../components/Common/ResultContent";
import { useLocation } from "react-router-dom";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-between;
`;

export default function Error() {

    const location = useLocation();
    const { status, message } = location.state || { status: 500, message: '알 수 없는 문제가 발생했어요' };

    return (
        <>
            <ResultContent 
                fail={ { "title": status, "subTitle" : message } }
                loop="false"
            />

            <ButtonContainer>
                <button type="button" onClick={ () => window.history.back() }>이전 페이지로</button>
                <button type="button" onClick={ () => window.location.href = "/" }>홈으로</button>
            </ButtonContainer>
        </>
    );
}