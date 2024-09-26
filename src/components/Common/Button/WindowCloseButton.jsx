import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const CloseButton = styled.button`
    font-size: 1.5rem;
    color: #444;

    &:hover {
        & > i {
            animation: ${rotateAnimation} 1s ease-in-out 1;
        }
    }
`;

export default function WindowCloseButton({ onClick }) {
    return (
        <CloseButton type="button" onClick={ onClick }>
            <i className="fa-solid fa-xmark"></i>
        </CloseButton>
    );
}