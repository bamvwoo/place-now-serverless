import styled from "styled-components";

const InputBase = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    background-color: #f5f5f5;
    border-radius: 5px;
    transition: .2s ease-in-out;
    position: relative;

    padding: ${props =>
        props.$size && props.$size === "s" ?
            "5px" :
        props.$size && props.$size === "m" ?
            "10px" :
        props.$size && props.$size === "l" ?
            "15px" :
            "10px"
    };

    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };

    &[type=checkbox] {
        width: ${props =>
            props.$size && props.$size === "s" ?
                "10px" :
            props.$size && props.$size === "m" ?
                "15px" :
            props.$size && props.$size === "l" ?
                "20px" :
                "15px"
        };

        height: ${props =>
            props.$size && props.$size === "s" ?
                "10px" :
            props.$size && props.$size === "m" ?
                "15px" :
            props.$size && props.$size === "l" ?
                "20px" :
                "15px"
        };
    }

    &[type=text]::placeholder,
    &[type=password]::placeholder {
        position: absolute;
        color: #777;

        ${props =>
            props.$size && props.$size === "s" ?
                `
                    top: 3px;
                    left: 5px;
                    font-size: 0.4rem;
                ` :
            props.$size && props.$size === "m" ?
                `
                    top: 5px;
                    left: 10px;
                    font-size: 0.6rem;
                ` :
            props.$size && props.$size === "l" ?
                `
                    top: 7px;
                    left: 15px;
                    font-size: 0.8rem;
                ` :
                `
                    top: 5px;
                    left: 10px;
                    font-size: 0.6rem;
                `
        };
    }

    &[type=text]:placeholder-shown,
    &[type=password]:placeholder-shown {
        padding: ${props =>
            props.$size && props.$size === "s" ?
                "20px 10px 10px 10px" :
            props.$size && props.$size === "m" ?
                "20px 10px 10px 10px" :
            props.$size && props.$size === "l" ?
                "25px 15px 15px 15px" :
                "20px 10px 10px 10px"
        };
    }

    &&[type=text].form-is-invalid,
    &&[type=password].form-is-invalid{
        border: 1px solid red;
    }
`;

export default InputBase;