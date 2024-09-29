import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 5px;
    gap: 10px;
`;

const ImageCard = styled.li`
    width: ${props => props.$hasSiblings ? '95%' : '100%'};
    height: 100%;
    flex-shrink: 0;
    background: url(${props => props.$src}) no-repeat center;
    background-size: contain;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &.selected {
        box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
    }
`;

export default function Carousel({ sources, onSelect }) {

    const handleOnClick = (event, index) => {
        const target = event.target;
        if (target.tagName === 'LI') {
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
        <Wrapper>
            {
                sources.map((source, index) => {
                    return (
                        <ImageCard key={ index } onClick={ (e) => handleOnClick(e, index) } $src={ source } $hasSiblings={ sources.length > 1 } />
                    )
                })
            }
        </Wrapper>
    )
}