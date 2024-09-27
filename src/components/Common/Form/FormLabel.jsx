import styled from "styled-components";

const FormLabel = styled.label`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 5px;

    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };
`;

export default FormLabel;