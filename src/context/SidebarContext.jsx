import { createContext, useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const openAnimation = (rightPosition) => keyframes`
  0% {
    right: -400px;
    transform: scale(0.9);
  }

  70% {
    right: ${rightPosition + 10}px;
    transform: scaleX(1.02);
  }

  100% {
    right: ${rightPosition}px;
    transform: scaleX(1);
  }
`;

const closeAnimation = (rightPosition) => keyframes`
  0% {
    right: ${rightPosition}px;
    transform: scaleX(1);
  }

  30% {
    right: ${rightPosition + 10}px;
    transform: scaleX(1.02);
  }

  100% {
    right: -400px;
    transform: scale(0.9);
  }
`;

const SidebarContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: -400px;
  width: 400px;
  height: 80vh;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  animation: ${(props) =>
    props['data-is-closing']
      ? css`${closeAnimation(props['data-right-position'])} 0.7s ease-in-out forwards`
      : css`${openAnimation(props['data-right-position'])} 0.7s ease-in-out forwards`};
`;

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isClosing, setIsClosing ] = useState(false);
  const [ content, setContent ] = useState(null);
  const [ rightPosition, setRightPosition ] = useState(0);

  const sidebarRef = useRef(null);

  const openSidebar = (content) => {
    setIsOpen(true);
    setIsClosing(false);
    setContent(content);
  };

  const closeSidebar = () => {
    setIsClosing(true);
    setContent(null);
    setTimeout(() => {
      setIsOpen(false);
    }, 700);
  };

  const toggleSidebar = (content) => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar(content);
    }
  };

  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    const computedStyle = getComputedStyle(wrapper);
    const marginRight = computedStyle.marginRight;
    const marginRightValue = parseFloat(marginRight);

    setContent(content);
    setRightPosition(marginRightValue);

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ isOpen, content ]);

  return (
    <SidebarContext.Provider value={{ openSidebar, closeSidebar, toggleSidebar }}>
      { children }

      { 
        isOpen && 
        <SidebarContainer ref={ sidebarRef } data-is-closing={ isClosing } data-right-position={ rightPosition }>
          { content }
        </SidebarContainer> 
      }
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}