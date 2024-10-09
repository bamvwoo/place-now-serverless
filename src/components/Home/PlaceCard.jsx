import styled from "styled-components";
import { HorizontalWrapper } from "../Common/Wrapper";
import { useState } from "react";

const Wrapper = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 80px;
    cursor: pointer;
    border-radius: 20px;

    ${props => props.$solid ? 
        `
        background-color: #444;
        color: #fff;
        ` : 
        `
        background-color: #fff;
        color: #444;
        `
    }
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: .2s ease-in-out;

    &.selected {
    }

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

        ${props => props.$solid ?
            `
            background-color: #555;
            ` :
            `
            background-color: #f2f2f2;
            `
        }
    }
`;

const PlaceInfo = styled(HorizontalWrapper)`
    justify-content: flex-start;
    width: 100%;
    padding: 10px 20px;
    z-index: 1;
    gap: 10px;

    & > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    & > h3 {
        font-size: 1.2rem;
        font-weight: 500;

        & > i {
            margin-right: 5px;
        }
    }
`;

export default function PlaceCard({ place, solid, onClick, children }) {

    const [ thumbnail, setThumbnail ] = useState(place?.images?.filter(image => image.thumbnail)[0]);

    const handleOnClick = (e) => {
        if (onClick) {
            onClick(e, place);
        }
    }

    return (
        <Wrapper $solid={ solid } $thumbnail={ thumbnail?.url } onClick={ handleOnClick }>
            <PlaceInfo>
            {
                place ? (
                        <>
                            <img src={ thumbnail.url } alt={ `${place.name} Thumbnail` } />
                            <h3>{ place.name }</h3>
                        </>
                    ) :
                    children
                }
            </PlaceInfo>
        </Wrapper>
    );
}