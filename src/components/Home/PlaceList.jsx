import { useState, useEffect } from "react";
import { axiosInstance } from "../../context/AuthContext";
import { VerticalWrapper } from "../Common/Wrapper";
import styled from "styled-components";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;

    & > ul {
        display: flex;
        width: 100%;
        height: 100%;
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

    const handleSetSelectedPlace = (place) => {
        setSelectedPlace(place);
    }

    return (
        <Wrapper>
            <ul>
                {
                    places.length > 0 ? (
                        places.map(place => (
                            <li key={place._id} onClick={ () => handleSetSelectedPlace(place) }>
                                <h2>{place.name}</h2>
                            </li>
                        ))
                    ) : (
                        <li>Loading...</li>
                    )
                }
            </ul>
        </Wrapper>
    )
}