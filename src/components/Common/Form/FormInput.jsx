import { useController, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../Wrapper";
import { useEffect } from "react";
import FormLabel from "./FormLabel";
import TextInput from "../Input/TextInput";
import CheckboxInput from "../Input/CheckboxInput";
import FileInput from "../Input/FileInput";

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

const InputContainer = styled(VerticalWrapper)`
    width: 100%;
    gap: 5px;
`;

export default function FormInput({ type, field, ...props }) {

    useEffect(() => {
    }, []);

    return (
        <Wrapper>
            <InputContainer>
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
            </InputContainer>

        </Wrapper>
    )
}