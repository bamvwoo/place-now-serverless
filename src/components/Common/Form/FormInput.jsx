import styled from "styled-components";
import { VerticalWrapper } from "../Wrapper";
import { useEffect } from "react";
import TextInput from "../Input/TextInput";
import CheckboxInput from "../Input/CheckboxInput";
import FileInput from "../Input/FileInput";
import TextAreaInput from "../Input/TextAreaInput";

const Wrapper = styled(VerticalWrapper)`
    align-items: flex-start;
    width: 100%;
    gap: 5px;

    & > i {
        font-size: ${props =>
            props.$size && props.$size === "s" ?
                "0.6rem" :
            props.$size && props.$size === "m" ?
                "0.8rem" :
            props.$size && props.$size === "l" ?
                "1rem" :
                "0.8rem"
        };
    }
`;

export const InvalidText = styled.p`
    color: red;
    align-self: flex-start;

    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.4rem" :
        props.$size && props.$size === "m" ?
            "0.6rem" :
        props.$size && props.$size === "l" ?
            "0.8rem" :
            "0.6rem"
    };
`;

export default function FormInput({ type, field, ...props }) {

    useEffect(() => {
    }, []);

    return (
        <Wrapper>
            {
                (type === 'text' || type === 'password' || type === 'hidden') && 
                    <TextInput type={ type } field={ field } { ...props } />
            }

            {
                (type === 'file') &&
                    <FileInput field={ field } { ...props } />
            }

            {
                (type === 'checkbox') &&
                    <CheckboxInput field={ field } { ...props } />
            }

            {
                (type === 'textarea') &&
                    <TextAreaInput field={ field } { ...props } />
            }
        </Wrapper>
    )
}