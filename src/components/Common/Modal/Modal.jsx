import styled, { keyframes } from "styled-components";
import ModalHeader from "./ModalHeader";
import { useEffect, useState } from "react";

const ModalOpenButton = styled.button`
`;

const open = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(0.1);
        border-radius: 50%;
    }
    80% {
        transform: translate(-50%, -50%) scale(1.1);
        border-radius: 20px;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        overflow: auto;
    }
`;

const close = keyframes`
    20% {
        transform: translate(-50%, -50%) scale(1.1);
    }
    90% {
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 50vw;
    max-height: 50vh;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    padding: 5px 0 0 5px;
    box-shadow: inset 3px 2px 0px 2px #00C1A2;
    transform: translate(-50%, -50%);
    animation: ${props => (props['data-is-closing'] ? close : open)} 0.4s ease-in-out forwards;
    z-index: 10001;

    .dark-mode &, .dark-mode & > div {
        background-color: #777;
    }

    .light-mode &, .light-mode & > div {
        background-color: #f9f9f9;
    }
`;

const spread = keyframes`
    0% {
        width: 5vw;
        height: 5vw;
        border-radius: 50%;
    }
    90% {
        width: 120vw;
        height: 120vw;
        border-radius: 50%;
    }
    100% {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
`;

const concentrate = keyframes`
    0% {
        width: 120vw;
        height: 120vw;
        border-radius: 50%;
    }
    90% {
        width: 5vw;
        height: 5vw;
        border-radius: 50%;
    }
    100% {
        width: 0vw;
        height: 0vw;
        border-radius: 5px;
    }
`;

const ModalBackGround = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(0, 0, 0, .1);
    backdrop-filter: blur(2px);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, .3);
    animation: ${props => (props['data-is-closing'] ? concentrate : spread)} 0.4s ease-in-out forwards;
    z-index: 10000;
`;

const ModalContents = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    flex: 1;
    border-radius: 0 0 20px 20px;
`;

export default function Modal({ children, title, openText, closeText }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isClosing, setIsClosing ] = useState(false);

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    }

    useEffect(() => {
    }, [ isClosing ]);

    return (
        <>
            <ModalOpenButton type="button" onClick={ () => setIsOpen(true) }>{ openText }</ModalOpenButton>
            
            { isOpen && (
                <>
                    <Wrapper data-is-closing={ isClosing }>
                        <ModalHeader title={ title } closeText={ closeText } handleClose={ handleClose } />
                        <ModalContents>
                            { children }
                        </ModalContents>
                    </Wrapper>
                    <ModalBackGround data-is-closing={ isClosing } onClick={ handleClose } />
                </>
            ) }
        </>
    )
}