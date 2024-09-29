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

const cardAnimation = keyframes`
    0% {
        transform: perspective(1000px) rotateY(0deg);
    }

    25% {
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        transform: perspective(1000px) rotateY(2deg);
    }
        
    50% {
        transform: perspective(1000px) rotateY(0deg);
    }
            
    75% {
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        transform: perspective(1000px) rotateY(-2deg);
    }
                
    100% {
        transform: perspective(1000px) rotateY(0deg);
    }
`;

const PlaceCard = styled(VerticalWrapper)`
    margin: 10px;
    width: 450px;
    height: 300px;
    cursor: pointer;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 0;

    &:hover {
        animation: ${cardAnimation} 2s linear infinite;
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
                        <PlaceCard>Loading ...</PlaceCard>
                    )
                }
            </ul>
        </Wrapper>
    )
}