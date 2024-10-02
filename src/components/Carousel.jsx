import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    width: 100%;
    flex: 1;
    overflow: hidden;
    padding: 5px;
    gap: 10px;
`;

const ImageCard = styled.li`
    width: ${props => props.$hasSiblings ? '95%' : '100%'};
    height: 100%;
    flex-shrink: 0;
    background: url(${props => props.$src}) no-repeat center;
    background-size: cover;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    position: relative;
    cursor: pointer;
    
    & > i {
        display: none;
        font-size: 2rem;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
    }

    &:not(.selected):hover {
        & > i {
            display: block;
            opacity: 0.5;
        }
    }

    &.selected > i {
        display: block;
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

            if (onSelect) {
                onSelect(target, index);
            }
        }
    }

    useEffect(() => {
        
    }, [ sources ]);

    return (
        <Wrapper>
            {
                sources?.map((source, index) => {
                    return (
                        <ImageCard key={ index } onClick={ (e) => handleOnClick(e, index) } $src={ source } $hasSiblings={ sources.length > 1 }>
                            <i className="fa-solid fa-circle-check"></i>
                        </ImageCard>
                    )
                })
            }
        </Wrapper>
    )
}