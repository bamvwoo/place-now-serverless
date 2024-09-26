import styled from "styled-components";

const WrapperBase = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const HorizontalWrapper = styled(WrapperBase)`
    flex-direction: row;
`;

export const VerticalWrapper = styled(WrapperBase)`
    flex-direction: column;
`;