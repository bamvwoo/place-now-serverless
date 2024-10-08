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

    const handleOnChange = (e) => {
        field.onChange(e);
        props.onChange && props.onChange(e);
    };

    const handleOnKeyUp = (e) => {
        props.onKeyUp && props.onKeyUp(e);
    };

    const handleOnKeyDown = (e) => {
        props.onKeyDown && props.onKeyDown(e);
    };

    return (
        <>
            <InputBase type={ type }
                id={ field.name }
                className={ invalid ? "form-is-invalid" : "" }

                value={ field.value }
                placeholder={ fieldData.placeholder }

                onClick={ props.onClick }
                onChange={ handleOnChange }
                onKeyUp={ handleOnKeyUp }
                onKeyDown={ handleOnKeyDown }

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