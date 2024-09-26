import OAuthButton from "./OAuthButton";

export default function NaverOAuthContainer({ setIsAuthenticating }) {
    const CLIENT_ID = import.meta.env.VITE_OAUTH_NAVER_CLIENT_ID;
    const REDIRECT_URI = `${import.meta.env.VITE_AUTH_REDIRECT_BASE_URI}/naver`;
    const STATE = Math.random().toString(36).substring(3, 14);

    const AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

    const loginByNaver = () => {
        window.location.href = AUTH_URL;
    }

    return (
        <>
            {
                CLIENT_ID && (
                    <OAuthButton onClick={ () => loginByNaver() }>
                        <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1644169460/noticon/frvhykszxhjz4asz77oi.png" />
                        <span>네이버로 시작</span>
                    </OAuthButton>
                )
            }
        </>
    )
}