import styled from "styled-components";
import WindowCloseButton from "../Button/WindowCloseButton";

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 25px;
    border: none;
    margin-bottom: 10px;
`;

export default function SidebarHeader({ close }) {
    return (
        <Wrapper>
            <WindowCloseButton onClick={ () => close() } />
        </Wrapper>
    );
}