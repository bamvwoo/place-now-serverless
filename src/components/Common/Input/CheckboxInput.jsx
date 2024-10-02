import { useController, useFormContext } from "react-hook-form";
import { InvalidText } from "../Form/FormInput";
import FormLabel from "../Form/FormLabel";
import InputBase from "./InputBase";
import { HorizontalWrapper } from "../Wrapper";
import styled from "styled-components";

const LabelInputWrapper = styled(HorizontalWrapper)`
    width: 100%;
    justify-content: flex-start;
    gap: 5px;
`;

export default function CheckboxInput({ field: fieldData, ...props }) {
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

    return (
        <>
            <LabelInputWrapper>
                <InputBase type="checkbox"
                    id={ field.name }
                    className={ invalid ? "form-is-invalid" : "" }

                    checked={ field.value }

                    onClick={ props.onClick }
                    onChange={ field.onChange }

                    readOnly={ props.readOnly }

                    $size={ props.size }
                />

                {   
                    props.label &&
                    <FormLabel htmlFor={ field.name } $size={ props.size }>{ props.label }</FormLabel>
                }
            </LabelInputWrapper>


            {
                invalid &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { error?.message }</InvalidText> 
            }
        </>
    )
}