import styled from "styled-components";
import WindowCloseButton from "../Button/WindowCloseButton";
import { HorizontalWrapper } from "../Wrapper";

const Wrapper = styled(HorizontalWrapper)`
    justify-content: space-between;
    width: 100%;
    height: 25px;
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