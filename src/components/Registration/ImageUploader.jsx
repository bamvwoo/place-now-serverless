import { useFormContext  } from "react-hook-form";
import Carousel from "../Carousel";
import { useEffect, useState } from "react";
import styled from "styled-components";

const RootContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export default function ImageUploader ({ name, required, thumbnailEnabled }) {

    name = name || "images";
    required = required || false;
    thumbnailEnabled = thumbnailEnabled || false;

    const { register, formState: { errors }, setValue } = useFormContext();

    const [ previews, setPreviews ] = useState([]);

    const handleImagesChange = (event) => {
        const newPreviews = [...previews];

        const files = event.target.files;
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
    });

    return (
        <RootContainer>
            <input type="file"
                {
                    ...register(name, {
                        required: (required ? required : false)
                    })
                }
                accept="image/*"
                onChange={ handleImagesChange }
                multiple
            />
            { errors[name] ? <p>{ errors[name].message }</p> : null }
            
            <Carousel sources={ previews } onSelect={ handleThumbnailChange } />
            {
                thumbnailEnabled ?
                <input type="hidden"
                    {
                        ...register("thumbnail", {
                            required: '썸네일로 지정할 이미지를 선택해주세요'
                        })
                    }
                /> : null
            }
            { errors.thumbnail ? <p>{ errors.thumbnail.message }</p> : null }
        </RootContainer>
    )
}