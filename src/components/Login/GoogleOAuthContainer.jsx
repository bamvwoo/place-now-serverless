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
    const CLIENT_ID = import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID;

    return (
        <>
            {
                CLIENT_ID && (
                    <GoogleOAuthProvider clientId={ CLIENT_ID }>
                        <GoogleLoginButton />
                    </GoogleOAuthProvider>
                )
            }
        </>
    )
}

const GoogleLoginButton = () => {
    const handleGoogleLoginSuccess = (response) => {
        console.log(response);
    };

    const handleGoogleLoginFailure = (error) => {

    };

    const loginByGoogle = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess,
        onError: handleGoogleLoginFailure
    });

    return (
        <LoginButton onClick={() => loginByGoogle()} >
            <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1648777274/noticon/uupi5ephlcx4f82axldc.png" />
            Google로 로그인
        </LoginButton>
    );
}