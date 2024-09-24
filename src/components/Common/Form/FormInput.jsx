import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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

export default function FormInput({ type, name, required, placeholder, validate, minLength, maxLength, pattern }) {
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
                />

            { 
                required && typeof required === 'string' && errors[name] && 
                <InvalidText>{ errors[name].message }</InvalidText> 
            }
        </Wrapper>
    )
}