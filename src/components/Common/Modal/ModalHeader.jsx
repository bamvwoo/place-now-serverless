import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 25px;
    border-radius: 20px 20px 0 0;
    border: none;
    margin-bottom: 10px;

    & > span {
        font-size: 0.8rem;
    }

    & > button {
        font-size: 1.5rem;
        color: #444;
    }

    & > button:hover {
        & > i {
            animation: ${rotate} 1s ease-in-out 1;
        }
    }
`;

export default function ModalHeader({ title, close }) {
    return (
        <Wrapper>
            <span>{ title }</span>
            <button type="button" onClick={ () => close() }>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </Wrapper>
    )
}