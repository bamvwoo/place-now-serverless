import styled from "styled-components";

const LoginButton = styled.button`
    --main-color: #03C75A;

    color: var(--main-color);
    border: 1px solid var(--main-color);

    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;

export default function NaverOAuthContainer() {
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
                    <LoginButton onClick={ () => loginByNaver() } >
                        <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1644169460/noticon/frvhykszxhjz4asz77oi.png" />
                        네이버로 로그인
                    </LoginButton>
                )
            }
        </>
    )
}