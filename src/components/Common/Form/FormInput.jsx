import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { HorizontalWrapper, VerticalWrapper } from "../Wrapper";
import { useEffect, useRef, useState } from "react";
import FormLabel from "./FormLabel";

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

const InvalidText = styled.p`
    color: red;

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

const InputContainer = styled(HorizontalWrapper)`
    width: 100%;
    gap: 5px;
`;

const Input = styled.input`
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

    &.form-is-invalid {
        border: 1px solid red;
    }
`;

export default function FormInput(props) {
    const { register, formState: { errors }, setValue } = useFormContext();

    const [ files, setFiles ] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        
    }, []);

    return (
        <Wrapper>
            <InputContainer>
                <Input ref={ inputRef }
                    id={ props.name }
                    type={ props.type }
                    placeholder={ props.placeholder }
                    { 
                        ...register(props.name, { 
                            required: props.required,
                            minLength: props.minLength,
                            maxLength: props.maxLength,
                            validate: props.validate,
                            pattern: props.pattern,
                            readOnly: props.readOnly
                        }) 
                    }

                    defaultValue={ props.defaultValue }
                    className={ errors[props.name] ? "form-is-invalid" : "" }

                    onClick={ props.onClick }
                    onChange={ props.onChange }

                    readOnly={ props.readOnly }
                    accept={ props.accept }
                    multiple={ props.multiple }

                    $size={ props.size }
                />

                {
                    props.type === 'checkbox' && props.label &&
                    <FormLabel htmlFor={ props.name } $size={ props.size }>{ props.label }</FormLabel>
                }
            </InputContainer>

            { 
                props.required && typeof props.required === 'string' && errors[props.name] &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { errors[props.name].message }</InvalidText> 
            }
        </Wrapper>
    )
}