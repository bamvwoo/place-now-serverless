import styled from "styled-components";

const BasicButtonBase = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    transition: .2s ease-in-out;
`;

export const BasicButton = styled(BasicButtonBase)`
    --main-color: ${props => props.$solid ? "#fff" : "#444"};
    --reverse-color: ${props => props.$solid ? "#444" : "#fff"};

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
            "8px" :
        props.$size && props.$size === "m" ?
            "10px" :
        props.$size && props.$size === "l" ?
            "12px" :
            "10px"
    };

    padding: var(--padding);

    font-size: var(--font-size);
    font-weight: var(--font-weight);

    border-color: var(--main-color);
    background-color: var(--reverse-color);
    color: var(--main-color);

    gap: 5px;

    ${props => props.$solid ? 
        `border: none;` :
        null
    }

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