import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { VerticalWrapper } from "./Common/Wrapper";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    flex: 1;
    position: relative;
`;

const ImageCardList = styled.ul`
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
    cursor: pointer;
    position: relative;
    
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
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #333;
`;

const ImageButton = styled.button`
    position: absolute;
    top: calc(50% - 20px);
    z-index: 2;
    padding: 10px;
    opacity: 0.3;
    transition: .2s ease-in-out;
    font-size: 1.5rem;

    &:hover {
        opacity: 1;
    }
`;

const PrevImageButton = styled(ImageButton)`
    left: 0px;
`;

const NextImageButton = styled(ImageButton)`
    right: 0px;
`;

export default function Carousel({ sources, onSelect, selectedIndex }) {

    const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
    const [ isLeftOverflow, setIsLeftOverflow ] = useState(false);
    const [ isRightOverflow, setIsRightOverflow ] = useState(false);

    const imageCardListRef = useRef(null);

    const selectImage = (index) => {
        const elem = imageCardListRef.current.children[index];
        if (elem && elem.tagName === 'LI') {
            const selected = imageCardListRef.current.querySelector('.selected');
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
    };

    const handleOnPrevButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleOnNextButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentImageIndex < sources.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        }
    };

    useEffect(() => {
        if (selectedIndex !== undefined) {
            selectImage(selectedIndex);
        }

        const handleScroll = () => {
            const list = imageCardListRef.current;

            const firstChild = list.firstElementChild;
            const lastChild = list.lastElementChild;

            if (firstChild) {
                setIsLeftOverflow(firstChild.getBoundingClientRect().left < list.getBoundingClientRect().left);
            }

            if (lastChild) {
                setIsRightOverflow(lastChild.getBoundingClientRect().right > list.getBoundingClientRect().right);
            }
        };

        if (imageCardListRef.current) {
            handleScroll();

            imageCardListRef.current.addEventListener("scroll", handleScroll);

            const currentImage = imageCardListRef.current.children[currentImageIndex];
            if (currentImage) {
                imageCardListRef.current.scrollTo({
                    left: currentImage.offsetLeft,
                    behavior: "smooth"
                });
            }
        }

        return () => {
            if (imageCardListRef.current) {
                imageCardListRef.current.removeEventListener("scroll", handleScroll);
            }
        }
    }, [ sources, currentImageIndex, selectedIndex ]);

    return (
        <Wrapper>
            {
                isLeftOverflow &&
                <PrevImageButton type="button" onClick={ handleOnPrevButtonClick }><i className="fa-solid fa-circle-chevron-left"></i></PrevImageButton>
            }

            <ImageCardList ref={ imageCardListRef }>
            {
                sources?.map((source, index) => {
                    return (
                        <ImageCard key={ index } onClick={ (e) => handleOnClick(e, index) } $src={ source } $hasSiblings={ sources.length > 1 }>
                            <i className="fa-solid fa-circle-check"></i>
                        </ImageCard>
                    )
                })
            }
            </ImageCardList>

            {
                isRightOverflow &&
                <NextImageButton type="button" onClick={ handleOnNextButtonClick }><i className="fa-solid fa-circle-chevron-right"></i></NextImageButton>
            }

            {
                sources && sources.length > 0 &&
                <CountingText>{ currentImageIndex + 1 } / { sources.length }</CountingText>
            }
        </Wrapper>
    )
}