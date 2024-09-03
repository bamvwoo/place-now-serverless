import { useEffect } from "react";
import styled from "styled-components";

const RootContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
        display: flex;
    }
`;

const Img = styled.img`
    border: 1px solid black;

    &.selected {
        border: 3px solid blue;
    }
`;

export default function Carousel({ sources, onSelect }) {

    const handleOnClick = (event, index) => {
        const target = event.target;
        if (target.tagName === 'IMG') {
            const selected = document.querySelector('.selected');
            if (selected) {
                selected.classList.remove('selected');
            }
            target.classList.add('selected');
            onSelect(target, index);
        }
    }

    useEffect(() => {

    }, [ sources ]);

    return (
        <RootContainer>
            <ul>
                {
                    sources.map((source, index) => {
                        return (
                            <li key={ index }>
                                <Img src={ source } alt={ `Preview Image ${index}` } onClick={ (event) => handleOnClick(event, index) } />
                            </li>
                        )
                    })
                }
            </ul>
        </RootContainer>
    )
}