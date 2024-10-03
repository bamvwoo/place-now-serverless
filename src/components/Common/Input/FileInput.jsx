import { useController, useFormContext } from "react-hook-form";
import { InvalidText } from "../Form/FormInput";
import InputBase from "./InputBase";
import styled from "styled-components";
import { useRef, useState } from "react";
import FileAttach from "./FileAttach";

const Input = styled(InputBase)`
    display: none;
`;

export default function FileInput({ field: fieldData, ...props }) {
    const { control, setValue, getValues } = useFormContext();

    const [ attachments, setAttachments ] = useState(getValues(fieldData.name) ? Object.values(getValues(fieldData.name)) : []);

    const fileInputRef = useRef(null);

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
        setAttachments(Object.values(files));

        if (props.onChange) {
            props.onChange(e);
        }
    };

    const handleOnRemoveAttachment = (e, index) => {
        e.preventDefault();

        const newAttachments = attachments.filter((attachment, i) => i !== index);
        setAttachments(newAttachments);

        const newImageArray = Object.values(getValues(field.name)).filter((image, i) => i !== index);

        const dataTransfer = new DataTransfer();
        newImageArray.forEach(file => dataTransfer.items.add(file));
        
        setValue(field.name, dataTransfer.files);

        if (props.onAttachmentRemove) {
            props.onAttachmentRemove(e, index);
        }
    };

    return (
        <>
            <Input ref={ fileInputRef } type="file"
                id={ field.name }
                className={ invalid ? "form-is-invalid" : "" }

                onChange={ handleOnChange }

                accept={ props.accept }
                multiple={ props.multiple }

                $size={ props.size }
            />

            <FileAttach 
                fileInputRef={ fileInputRef } 
                attachments={ attachments } 
                onAttachmentRemove={ handleOnRemoveAttachment } 
                size={ props.size } 
            />

            {
                invalid &&
                    <InvalidText $size={ props.size }><i className="fa-solid fa-triangle-exclamation"></i> { error?.message }</InvalidText> 
            }
        </>
    )
}