import styled, { css, keyframes } from "styled-components";
import ModalHeader from "./ModalHeader";
import { forwardRef } from "react";

const openAnimation = keyframes`
  0% {
    top: 150%;
    transform: translate(-50%, -50%) scale(0.8) perspective(1000px) rotateX(-20deg);
  }

  70% {
    top: 45%;
    transform: translate(-50%, -50%) scaleY(1.02) perspective(1000px) rotateX(-5deg);
  }

  100% {
    top: 50%;
    transform: translate(-50%, -50%) scale(1) rotateX(0deg);
  }
`;

const closeAnimation = keyframes`
  0% {
    top: 50%;
    transform: translate(-50%, -50%) scale(1) rotateX(0deg);
  }

  30% {
    top: 45%;
    transform: translate(-50%, -50%) scaleY(1.02) perspective(1000px) rotateX(5deg);
  }

  100% {
    top: 150%;
    transform: translate(-50%, -50%) scale(0.8) perspective(1000px) rotateX(20deg);
  }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
    position: absolute;
    left: 50%;
    border-radius: 5px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.01);
    padding: 10px;
    z-index: 10001;
    animation: ${(props) =>
    props['data-is-closing']
      ? css`${closeAnimation} 0.7s ease-in-out forwards`
      : css`${openAnimation} 0.7s ease-in-out forwards`};

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

const Modal = forwardRef(({ isClosing, close, title, children }, ref) => {
    return (
        <>
            <Wrapper ref={ ref } data-is-closing={ isClosing }>
                <ModalHeader title={ title } close={ close } />
                <ModalContents>
                    { children }
                </ModalContents>
            </Wrapper>
            <ModalBackGround onClick={ close } />
        </>
    );
});

Modal.displayName = 'Modal';

export default Modal;