import { useController, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { InvalidText } from "../Form/FormInput";

const TextAreaBase = styled.textarea`
    width: 100%;
    background-color: transparent;
    border: none;
    background-color: #f5f5f5;
    border-radius: 10px;
    transition: .2s ease-in-out;
    position: relative;
    resize: none;

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

    ${props => props.readOnly && 
        `
            color: #a2a2a2;
        `
    }

    &::placeholder {
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

    &[readonly]:hover,
    &[disabled]:hover {
        cursor: not-allowed;
    }

    &:placeholder-shown {
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

    &[type=text].form-is-invalid,
    &[type=password].form-is-invalid{
        border: 1px solid red;
    }
`;

export default function TextAreaInput({ field: fieldData, ...props }) {
    const { control } = useFormContext();

    const {
        field,
        fieldState: { invalid, error }
    } = useController({
        name: fieldData.name,
        control,
        rules: fieldData.rules,
        defaultValue: fieldData.defaultValue || ''
    });

    const handleOnChange = (e) => {
        field.onChange(e);
        props.onChange && props.onChange(e);
    };

    return (
        <>
            <TextAreaBase 
                id={ field.name }
                className={ invalid ? "form-is-invalid" : "" }
                placeholder={ fieldData.placeholder }
                value={ field.value }
                rows={
                    props.size === "s" ?
                        2 :
                    props.size === "m" ?
                        4 :
                    props.size === "l" ?
                        6 :
                        4
                }
                readOnly={ props.readOnly }
                $size={ props.size }

                onChange={ handleOnChange }
            >
                { field.defaultValue }
            </TextAreaBase>

            {
                invalid &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { error?.message }</InvalidText> 
            }
        </>
    )
}