import styled, { keyframes } from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../Common/Wrapper";
import { useState } from "react";

const cardHoverAnimation = keyframes`
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

const Wrapper = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
    width: 450px;
    height: 300px;
    cursor: pointer;
    border-radius: 20px;
    background: url(${props => props.$thumbnail}) no-repeat center;
    background-size: cover;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 0;
    backface-visibility: hidden;

    &:hover {
        animation: ${cardHoverAnimation} 2s linear infinite;
    }
`;

const PlaceInfo = styled(HorizontalWrapper)`
    justify-content: space-between;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0px 0px 20px 20px;
    color: #fff;
    padding: 10px;
`;

export default function PlaceCard({ place }) {

    const [ thumbnail, setThumbnail ] = useState(place.images.filter(image => image.thumbnail)[0]);

    return (
        <Wrapper $thumbnail={ thumbnail.url }>
            <PlaceInfo>
                <h3>{ place.name }</h3>
            </PlaceInfo>
        </Wrapper>
    );
}