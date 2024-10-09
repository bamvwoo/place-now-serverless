import ResultContent from "../ResultContent";
import FormButton from "../Button/FormButton";
import { useNavigate } from "react-router-dom";
import { useWindow } from "../../../context/WindowContext";
import Login from "../../Login/Login";
import { ButtonWrapper } from "../../../pages/Error";

export default function AuthError({ from }) {

    const navigate = useNavigate();
    const { openModal } = useWindow();

    const openLogin = (e) => {
        e.preventDefault();
        openModal(null, <Login successUrl={ from } />);
    };

    return (
        <>
            <ResultContent 
                fail={ { "title": "로그인이 필요해요" } }
                loop="false"
            />

            <ButtonWrapper>
                <FormButton direction="prev" size="l" text="이전 화면으로" icon={ false } onClick={ () => navigate(-1) } />
                <FormButton direction="next" size="l" text="로그인" icon={ false } onClick={ openLogin } />
            </ButtonWrapper>
        </>
    )
}