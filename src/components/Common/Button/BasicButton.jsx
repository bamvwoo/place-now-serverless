import styled from "styled-components";

const BasicButtonBase = styled.button`
    display: flex-inline;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    transition: .2s ease-in-out;
`;

export const BasicButton = styled(BasicButtonBase)`
    --main-color: ${props => props.$solid ? "#fff" : "#333"};
    --reverse-color: ${props => props.$solid ? "#333" : "#fff"};

    --font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };
    --font-weight: ${props =>
        props.$bold ? "bold" : "normal"
    };

    --padding: ${props =>
        props.$size && props.$size === "s" ?
            "7px" :
        props.$size && props.$size === "m" ?
            "9px" :
        props.$size && props.$size === "l" ?
            "12px" :
            "9px"
    };

    padding: var(--padding);

    font-size: var(--font-size);
    font-weight: var(--font-weight);

    border-color: var(--main-color);
    background-color: var(--reverse-color);
    color: var(--main-color);

    &:hover {
        ${props => props.$solid ?
            `
                background-color: rgba(0, 0, 0, 0.7);
            ` : 
            `
                background-color: var(--main-color);
                color: var(--reverse-color);
            `
        };
        
    }
`;