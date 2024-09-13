import ResultContent from "../components/Common/ResultContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { PageWrapper } from "../App";

export default function Auth() {

    const { type } = useParams();

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));

        axios.get(`/api/auth/${type}`, { params })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [ type ]);

    return (
        <PageWrapper>
            <ResultContent loading={ true } />
        </PageWrapper>
    );
}