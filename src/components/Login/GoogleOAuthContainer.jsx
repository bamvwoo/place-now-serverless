import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import OAuthButton from "./OAuthButton";
import { useNavigate } from "react-router-dom";
import { useWindow } from "../../context/WindowContext";

export default function GoogleOAuthContainer(props) {
    const CLIENT_ID = import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID;

    return (
        <>
            {
                CLIENT_ID && (
                    <GoogleOAuthProvider clientId={ CLIENT_ID }>
                        <GoogleLoginButton { ...props } />
                    </GoogleOAuthProvider>
                )
            }
        </>
    )
}

const GoogleLoginButton = ({ successUrl }) => {
    const navigate = useNavigate();
    const { closeModal } = useWindow();

    const handleGoogleLoginSuccess = (response) => {
        closeModal();
        
        localStorage.setItem("loginSuccessUrl", successUrl);
        navigate(`/auth/google?access_token=${response.access_token}`);
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