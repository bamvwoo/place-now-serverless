import { useFormContext  } from "react-hook-form";
import Carousel from "../Carousel";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FormInput from "../Common/Form/FormInput";
import { VerticalWrapper } from "../Common/Wrapper";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;
`;

export default function ImageUploader ({ name, required, thumbnailEnabled }) {

    name = name || "images";
    required = required || false;
    thumbnailEnabled = thumbnailEnabled || false;

    const { setValue } = useFormContext();

    const [ previews, setPreviews ] = useState([]);

    const handleImagesChange = (event) => {
        const files = event.target.files;
        
        if (files.length === 0) {
            return;
        }

        const newPreviews = [];
        for (const index in files) {
            const file = files[index];
            if (typeof file === 'object') {
                const imageSrc = URL.createObjectURL(files[index]);
                newPreviews.push(imageSrc);
            }
        }

        setPreviews(newPreviews);
    };

    const handleThumbnailChange = (img, index) => {
        if (thumbnailEnabled) {
            setValue("thumbnail", index);
        }
    };

    useEffect(() => {
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [ previews ]);

    return (
        <Wrapper>
            <FormInput 
                type="file" name={ name }
                accept="image/*"
                onChange={ handleImagesChange }
                multiple={ true }
            />
            {
                thumbnailEnabled &&
                    <FormInput 
                        type="hidden" name="thumbnail"
                        required="썸네일로 지정할 이미지를 선택해주세요"
                    />
            }
            
            <Carousel sources={ previews } onSelect={ handleThumbnailChange } />
        </Wrapper>
    )
}