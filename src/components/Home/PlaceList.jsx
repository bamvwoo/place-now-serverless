import { useEffect, useRef } from "react";
import { axiosInstance, useAuth } from "../../context/AuthContext";
import { VerticalWrapper } from "../Common/Wrapper";
import styled from "styled-components";
import PlaceCard from "./PlaceCard";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;

    & > ul {
        display: flex;
        width: 100%;
        height: 100%;
        flex-flow: row wrap;
        padding: 10px;
        gap: 20px;
    }
`;

export default function PlaceList({ places, setPlaces }) {

    const { user } = useAuth();
    const navigate = useNavigate();

    const placeListRef = useRef();

    useEffect(() => {
        axiosInstance.get('/api/place')
            .then(response => {
                setPlaces(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch places', error);
            });
    }, []);

    const handleOnPlaceCardClick = (e, place) => {
        if (placeListRef.current) {
            placeListRef.current.querySelector("li.selected")?.classList.remove('selected');
            e.currentTarget.classList.add('selected');
        }
    };

    return (
        <Wrapper>
            <ul ref={ placeListRef }>
                {
                    user &&
                        <PlaceCard solid={ true } onClick={ () => { navigate('/registration') } }><h3><i className="fa-solid fa-circle-plus"></i> 장소 추가</h3></PlaceCard>
                }

                {
                    places.length > 0 ? (
                        places.map((place, index) => (
                            <PlaceCard key={ index } place={ place } onClick={ handleOnPlaceCardClick } />
                        ))
                    ) : (
                        <span>Loading...</span>
                    )
                }
            </ul>
        </Wrapper>
    )
}