import styled from "styled-components";
import WindowCloseButton from "../Button/WindowCloseButton";

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
`;

export default function ModalHeader({ title, close }) {
    return (
        <Wrapper>
            <span>{ title }</span>
            <WindowCloseButton onClick={ () => close() } />
        </Wrapper>
    )
}