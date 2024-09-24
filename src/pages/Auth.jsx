import ResultContent from "../components/Common/ResultContent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Auth() {

    const { type } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));

        axios.get(`/api/auth/${type}`, { params })
            .then((response) => {
                const token = response.data;
                login(token);
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    }, [ type ]);

    return (
        <ResultContent loading={ true } />
    );
}