import styled from "styled-components";
import { HorizontalWrapper } from "../Common/Wrapper";
import { useState } from "react";

const Wrapper = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 250px;
    height: 100px;
    cursor: pointer;
    border-radius: 20px;
    background-color: #fff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: .2s ease-in-out;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

const PlaceInfo = styled(HorizontalWrapper)`
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    z-index: 1;

    & > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }

    & > h3 {
        font-size: 1.2rem;
        font-weight: 500;
    }
`;

export default function PlaceCard({ place }) {

    const [ thumbnail, setThumbnail ] = useState(place.images?.filter(image => image.thumbnail)[0]);

    return (
        <Wrapper $thumbnail={ thumbnail.url }>
            <PlaceInfo>
                <img src={ thumbnail.url } alt={ `${place.name} Thumbnail` } />
                <h3>{ place.name }</h3>
            </PlaceInfo>
        </Wrapper>
    );
}