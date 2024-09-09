import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import styled from "styled-components";

const LoginButton = styled.button`
    --main-color: #4285F4;

    color: var(--main-color);
    border: 1px solid var(--main-color);

    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;

export default function GoogleOAuthContainer() {
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

    const handleGoogleLoginSuccess = (response) => {
        console.log(response);
    };

    const handleGoogleLoginFailure = (error) => {

    };

    return (
        <>
            {
                clientId && (
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLoginButton
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                        />
                    </GoogleOAuthProvider>
                )
            }
        </>
    )
}

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    const googleLogin = useGoogleLogin({
        onSuccess,
        onError: onFailure,
    });

    return (
        <LoginButton onClick={() => googleLogin()} >
            <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1648777274/noticon/uupi5ephlcx4f82axldc.png" />
            Google 로 로그인
        </LoginButton>
    );
}