import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const PrivateRoute = ({ element, isVerificationRequired }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    useEffect(() => {

    }, [ user, isLoading ]);

    if (isLoading) {
        return null;
    } else {
        if (!user) {
            return <Navigate to="/error" state={{
                status: 401,
                message: "로그인이 필요해요",
                from: location.pathname
            }} />;
        } else if (isVerificationRequired && !(user.email)) {
            return <Navigate to="/error" state={{
                status: 403,
                message: "이메일 인증이 필요해요",
                from: location.pathname
            }} />;
        }
    }

    return element;
};

export default PrivateRoute;