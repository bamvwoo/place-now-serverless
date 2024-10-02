import { useController, useFormContext } from "react-hook-form";

export default function FieldInput({ field: fieldData }) {
    const { control } = useFormContext();

    const {
        field,
        fieldState: { invalid, error }
    } = useController({
        name: fieldData.name,
        control,
        rules: fieldData.rules
    });

    return (
        <div>
            <input type="text" name={ name } value={ field.value } />
            { invalid && <span>{ error?.message }</span> }
        </div>
    )
}