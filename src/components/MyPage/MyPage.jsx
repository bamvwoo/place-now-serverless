import { useAuth } from "../../context/AuthContext";
import { SidebarContentWrapper, useWindow } from "../../context/WindowContext";

export default function MyPage() {

    const { logout } = useAuth();
    const { closeSidebar } = useWindow();

    const handleLogout = (e) => {
        e.preventDefault();
        
        logout();
        closeSidebar();
    };

    return (
        <SidebarContentWrapper>
            <button onClick={ handleLogout }>로그아웃</button>
        </SidebarContentWrapper>
    )
}