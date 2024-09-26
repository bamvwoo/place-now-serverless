import styled from "styled-components";

const WrapperBase = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    overflow: hidden;
`;

export const HorizontalWrapper = styled(WrapperBase)`
    flex-direction: row;
`;

export const VerticalWrapper = styled(WrapperBase)`
    flex-direction: column;
`;