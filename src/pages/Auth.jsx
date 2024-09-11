import styled from "styled-components";
import ResultContent from "../components/Common/ResultContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const RootContainer = styled.main`
    display: flex;
    flex-direction: column;
`;

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
        <RootContainer>
            <ResultContent loading={ true } />
        </RootContainer>
    );
}