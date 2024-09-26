import styled from "styled-components";

const BasicButtonBase = styled.button`
    border: 1px solid #444;
    border-radius: 5px;
    transition: .2s ease-in-out;
    color: #444;

    &:hover {
        background-color: #444;
        color: white;
    }
`;

export const BasicButton = styled(BasicButtonBase)`
    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };

    padding: ${props =>
        props.$size && props.$size === "s" ?
            "3px 6px" :
        props.$size && props.$size === "m" ?
            "5px 10px" :
            props.$size && props.$size === "l" ?
            "7px 12px" :
            "5px 10px"
    };

    font-weight: ${props =>
        props.$bold ? "bold" : "normal"
    };
`;