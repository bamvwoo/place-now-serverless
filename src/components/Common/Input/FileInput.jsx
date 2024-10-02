import { useController, useFormContext } from "react-hook-form";
import { InvalidText } from "../Form/FormInput";
import InputBase from "./InputBase";

export default function FileInput({ field: fieldData, ...props }) {
    const { control, setValue, getValues } = useFormContext();

    const {
        field,
        fieldState: { invalid, error }
    } = useController({
        name: fieldData.name,
        control,
        rules: fieldData.rules
    });

    const handleOnChange = (e) => {
        field.onChange(e);

        const files = e.target.files;
        setValue(field.name, files);

        if (props.onChange) {
            props.onChange(e);
        }
    }

    return (
        <>
            <InputBase type="file"
                id={ field.name }
                className={ invalid ? "form-is-invalid" : "" }

                onClick={ props.onClick }
                onChange={ handleOnChange }

                accept={ props.accept }
                multiple={ props.multiple }

                $size={ props.size }
            />

            {
                invalid &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { error?.message }</InvalidText> 
            }
        </>
    )
}