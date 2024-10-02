import { useController, useFormContext } from "react-hook-form";
import { InvalidText } from "../Form/FormInput";
import InputBase from "./InputBase";

export default function TextInput({ type, field: fieldData, ...props }) {
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
            <InputBase type={ type }
                id={ field.name }
                className={ invalid ? "form-is-invalid" : "" }

                value={ field.value }
                placeholder={ props.placeholder }

                onClick={ props.onClick }
                onChange={ field.onChange }

                readOnly={ props.readOnly }

                $size={ props.size }
            />

            {
                invalid &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { error?.message }</InvalidText> 
            }
        </>
    )
}