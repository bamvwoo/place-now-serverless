import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    width: 100%;
    flex: 1;
    overflow: hidden;
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

const CountingText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #333;
`;

export default function Carousel({ sources, onSelect, selectedIndex }) {

    const [ currentIndex, setCurrentIndex ] = useState(0);

    const wrapperRef = useRef(null);

    const selectImage = (index) => {
        const elem = wrapperRef.current.children[index];
        if (elem && elem.tagName === 'LI') {
            const selected = wrapperRef.current.querySelector('.selected');
            if (selected) {
                selected.classList.remove('selected');
            }
            elem.classList.add('selected');
        }
    }

    const handleOnClick = (event, index) => {
        const elem = event.target;
        selectImage(index);

        if (onSelect) {
            onSelect(elem, index);
        }
    }

    useEffect(() => {
        if (selectedIndex !== undefined) {
            selectImage(selectedIndex);
        }
    }, [ sources ]);

    return (
        <Wrapper ref={ wrapperRef }>
            {
                sources?.map((source, index) => {
                    return (
                        <ImageCard key={ index } onClick={ (e) => handleOnClick(e, index) } $src={ source } $hasSiblings={ sources.length > 1 }>
                            <i className="fa-solid fa-circle-check"></i>
                        </ImageCard>
                    )
                })
            }

            {
                sources && sources.length > 0 &&
                <CountingText>{ currentIndex + 1 } / { sources.length }</CountingText>
            }
        </Wrapper>
    )
}