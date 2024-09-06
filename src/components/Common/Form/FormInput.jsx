import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const InvalidText = styled.p`
    font-size: 0.8rem;
    color: red;
    margin-bottom: 5px;
`;

export default function FormInput({ type, name, required, placeholder }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            { errors[name] && <InvalidText>{ errors[name].message }</InvalidText> }
            <div>
                <input 
                    type={ type }
                    placeholder={ placeholder }
                    { 
                        ...register(name, { 
                            required: required
                        }) 
                    }
                    className={ errors[name] ? "form-is-invalid" : "" }
                    />
            </div>
        </>
    )
}