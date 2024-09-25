import { forwardRef, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const openAnimation = (rightPosition) => keyframes`
  0% {
    border-radius: 50px;
    right: -400px;
    transform: scale(0.9) perspective(1000px) rotateY(-15deg);
  }

  70% {
    right: ${rightPosition + 10}px;
    transform: scaleX(1.02) perspective(1000px) rotateY(-5deg);
  }

  100% {
    border-radius: 20px;
    right: ${rightPosition}px;
    transform: scaleX(1) rotateY(0deg);
  }
`;

const closeAnimation = (rightPosition) => keyframes`
  0% {
    border-radius: 20px;
    right: ${rightPosition}px;
    transform: scaleX(1) perspective(1000px) rotateY(0deg);
  }

  30% {
    right: ${rightPosition + 20}px;
    transform: scaleX(1.02) perspective(1000px) rotateY(5deg);
  }

  100% {
    border-radius: 50px;
    right: -400px;
    transform: scale(0.9) perspective(1000px) rotateY(15deg);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 50px;
  right: -400px;
  width: 400px;
  height: 80vh;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  animation: ${(props) =>
    props['data-is-closing']
      ? css`${closeAnimation(props['data-right-position'])} 0.7s ease-in-out forwards`
      : css`${openAnimation(props['data-right-position'])} 0.7s ease-in-out forwards`};
`;

const Sidebar = forwardRef(({ isClosing, close, children }, ref) => {
  const [ rightPosition, setRightPosition ] = useState(0);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    const computedStyle = getComputedStyle(wrapper);
    const marginRight = computedStyle.marginRight;
    const marginRightValue = parseFloat(marginRight);

    setRightPosition(marginRightValue);

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ isClosing ]);

  return (
    <Wrapper ref={ ref } data-is-closing={ isClosing } data-right-position={ rightPosition }>
      {children}
    </Wrapper>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;