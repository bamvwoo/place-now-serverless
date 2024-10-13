import { forwardRef, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SidebarHeader from "./SidebarHeader";
import { VerticalWrapper } from "../Wrapper";

const openAnimation = (rightPosition) => keyframes`
  0% {
    border-radius: 50px;
    right: -400px;
    transform: scale(0.9) perspective(1000px) rotateY(-15deg);
  }

  70% {
    right: 60px;
    transform: scaleX(1.02) perspective(1000px) rotateY(-5deg);
  }

  100% {
    border-radius: 20px;
    right: 50px;
    transform: scaleX(1) rotateY(0deg);
  }
`;

const closeAnimation = (rightPosition) => keyframes`
  0% {
    border-radius: 20px;
    right: 50px;
    transform: scaleX(1) perspective(1000px) rotateY(0deg);
  }

  30% {
    right: 70px;
    transform: scaleX(1.02) perspective(1000px) rotateY(5deg);
  }

  100% {
    border-radius: 50px;
    right: -400px;
    transform: scale(0.9) perspective(1000px) rotateY(15deg);
  }
`;

const Wrapper = styled(VerticalWrapper)`
  position: absolute;
  bottom: 50px;
  right: -400px;
  width: 400px;
  height: calc(100vh - var(--global-header-height) - 50px);
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  animation: ${(props) =>
    props.$isClosing
      ? css`${closeAnimation(props.$rightPosition)} 0.7s ease-in-out forwards`
      : css`${openAnimation(props.$rightPosition)} 0.7s ease-in-out forwards`};
`;

const Sidebar = forwardRef(({ isClosing, close, children }, ref) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            close();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Wrapper ref={ ref } $isClosing={ isClosing }>
      <SidebarHeader close={ close } />
      {children}
    </Wrapper>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;