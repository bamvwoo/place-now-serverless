import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { VerticalWrapper } from "../Wrapper";

const Wrapper = styled(VerticalWrapper)`
    align-items: flex-start;
    width: 100%;
    gap: 5px;
`;

const InvalidText = styled.span`
    color: red;
    font-size: 0.6rem;
    text-align: right;
`;

const Input = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    background-color: #f5f5f5;
    border-radius: 5px;
    transition: .2s ease-in-out;
    position: relative;
    padding: 10px;

    &[type=text]::placeholder,
    &[type=password]::placeholder {
        position: absolute;
        top: 5px;
        left: 10px;
        font-size: 0.6rem;
        color: #777;
    }

    &[type=text]:placeholder-shown,
    &[type=password]:placeholder-shown {
        padding: 20px 10px 10px 10px;
    }

    &.form-is-invalid {
        border: 1px solid red;
    }
`;

export default function FormInput({ type, name, required, placeholder, validate, minLength, maxLength, pattern, onClick, readOnly }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Wrapper>
            <Input
                type={ type }
                placeholder={ placeholder }
                { 
                    ...register(name, { 
                        required,
                        minLength,
                        maxLength,
                        validate,
                        pattern
                    }) 
                }
                className={ errors[name] ? "form-is-invalid" : "" }
                onClick={ onClick }
                readOnly={ readOnly }
            />

            { 
                required && typeof required === 'string' && errors[name] && 
                <InvalidText><i className="fa-solid fa-triangle-exclamation"></i> { errors[name].message }</InvalidText> 
            }
        </Wrapper>
    )
}