import { useState, useEffect } from "react";
import { axiosInstance } from "../../context/AuthContext";
import { VerticalWrapper } from "../Common/Wrapper";
import styled from "styled-components";
import PlaceCard from "./PlaceCard";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;

    & > ul {
        display: flex;
        width: 100%;
        height: 100%;
        flex-flow: row wrap;
    }
`;

export default function PlaceList({ setSelectedPlace, setChatRooms }) {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/place')
        .then(response => {
            setPlaces(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch places', error);
        });
    }, []);

    return (
        <Wrapper>
            <ul>
                {
                    places.length > 0 ? (
                        places.map((place, index) => (
                            <PlaceCard key={ index } place={ place } />
                        ))
                    ) : (
                        <span>Loading...</span>
                    )
                }
            </ul>
        </Wrapper>
    )
}