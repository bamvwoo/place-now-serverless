import { useEffect, useState } from "react";
import styled from "styled-components";
import ResultContent from "../components/Common/ResultContent";
import { useParams } from "react-router-dom";

const RootContainer = styled.main`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-between;
`;

export default function Error() {

    const { status } = useParams();
    const [ message, setMessage ] = useState(null);

    useEffect(() => {
        switch (status) {
            case "401":
                setMessage("로그인이 필요해요");
                break;
            case "404":
                setMessage("페이지를 찾을 수 없어요");
                break;
            default:
                setMessage("알 수 없는 문제가 발생했어요");
                break;
        }
    }, [status]);

    return (
        <RootContainer>
            <ResultContent 
                fail={ { "title": status, "subTitle" : message } }
                loop="false"
            />

            <ButtonContainer>
                <button type="button" onClick={ () => window.history.back() }>이전 페이지로</button>
                <button type="button" onClick={ () => window.location.href = "/" }>홈으로</button>
            </ButtonContainer>
        </RootContainer>
    );
}