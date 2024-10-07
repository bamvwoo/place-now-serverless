import ResultContent from "../components/Common/ResultContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Auth() {

    const { type } = useParams();
    const { login } = useAuth();

    useEffect(() => {
        const getTokenAndLogin = async () => {
            const params = Object.fromEntries(new URLSearchParams(window.location.search));

            const response = await axios.post(`/api/auth/${type}`, { ...params });
            const token = response.data.token;

            await login(token);

            window.location.href = '/';
        };

        getTokenAndLogin();
    }, [ type ]);

    return (
        <ResultContent loading={ true } />
    );
}