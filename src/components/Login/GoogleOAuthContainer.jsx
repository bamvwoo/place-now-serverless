import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import OAuthButton from "./OAuthButton";

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
        window.location.href = "/auth/google?access_token=" + response.access_token;
    };

    const handleGoogleLoginFailure = (error) => {

    };

    const loginByGoogle = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess,
        onError: handleGoogleLoginFailure
    });

    return (
        <OAuthButton onClick={() => loginByGoogle()} >
            <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1648777274/noticon/uupi5ephlcx4f82axldc.png" />
            <span>Google로 시작</span>
        </OAuthButton>
    );
}