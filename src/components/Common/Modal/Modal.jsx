import styled from "styled-components";
import ModalHeader from "./ModalHeader";
import { useEffect, useRef, useState } from "react";

export const ModalOpenButton = styled.button`
    background-color: transparent;
    border: 1px solid #444;
    padding: 7px 12px;
    border-radius: 5px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.01);
    padding: 10px;
    z-index: 10001;

    .dark-mode &, .dark-mode & > div {
        background-color: #777;
    }

    .light-mode &, .light-mode & > div {
        background-color: white;
    }
`;

const ModalBackGround = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.01);
    backdrop-filter: blur(2px);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.01);
    z-index: 10000;
`;

const ModalContents = styled.div`
    width: 100%;
    height: calc(100% - 25px);
    flex: 1;
    border-radius: 0 0 20px 20px;
`;

export default function Modal({ children, title, openText, closeText }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isClosing, setIsClosing ] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(false);
    }

    useEffect(() => {
    }, [ isOpen ]);

    return (
        <>
            <ModalOpenButton ref={buttonRef} type="button" onClick={ () => setIsOpen(true) }>
                { openText }
            </ModalOpenButton>
            
            { isOpen && (
                <>
                    <Wrapper>
                        <ModalHeader title={ title } closeText={ closeText } handleClose={ handleClose } />
                        <ModalContents>
                            { children }
                        </ModalContents>
                    </Wrapper>
                    <ModalBackGround onClick={ handleClose } />
                </>
            ) }
        </>
    )
}