import { useState, useEffect } from "react";
import { axiosInstance } from "../../context/AuthContext";
import { VerticalWrapper } from "../Common/Wrapper";
import styled, { keyframes } from "styled-components";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;

    & > ul {
        display: flex;
        width: 100%;
        height: 100%;
    }
`;

const borderAnimation = keyframes`
    0% {
        box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
    }

    5% {
        box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.06);
    }

    10% {
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.07);
    }

    15% {
        box-shadow: 1.5px 1.5px 10px rgba(0, 0, 0, 0.08);
    }

    20% {
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.09);
    }

    25% {
        box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.1);
    }

    30% {
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    }

    35% {
        box-shadow: 3.5px 3.5px 10px rgba(0, 0, 0, 0.1);
    }

    40% {
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }

    45% {
        box-shadow: 4.5px 4.5px 10px rgba(0, 0, 0, 0.1);
    }

    50% {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    }

    55% {
        box-shadow: 4.5px 4.5px 10px rgba(0, 0, 0, 0.1);
    }

    60% {
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }

    65% {
        box-shadow: 3.5px 3.5px 10px rgba(0, 0, 0, 0.1);
    }

    70% {
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    }

    75% {
        box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.1);
    }

    80% {
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.09);
    }

    85% {
        box-shadow: 1.5px 1.5px 10px rgba(0, 0, 0, 0.08);
    }

    90% {
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.07);
    }

    95% {
        box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.06);
    }

    100% {
        box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
    }
`;

const PlaceCard = styled(VerticalWrapper)`
    margin: 10px;
    width: 450px;
    height: 300px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    &:hover {
        animation: ${borderAnimation} 2s ease infinite;
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
                        <PlaceCard>Loading...</PlaceCard>
                    )
                }
            </ul>
        </Wrapper>
    )
}