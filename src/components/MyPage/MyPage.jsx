import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useWindow } from "../../context/WindowContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const PageTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
`;

const LogoutButton = styled.button`
    background-color: transparent;
    border: 1px solid #444;
    padding: 7px 12px;
    border-radius: 5px;
`;

export default function MyPage() {

    const { logout } = useAuth();
    const { closeSidebar } = useWindow();

    const handleLogout = (e) => {
        e.preventDefault();
        
        logout();
        closeSidebar();
    };

    return (
        <Wrapper>
            <PageTitle>마이페이지</PageTitle>
            <LogoutButton onClick={ handleLogout }>로그아웃</LogoutButton>
        </Wrapper>
    )
}