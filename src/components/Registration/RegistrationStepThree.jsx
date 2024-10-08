import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../hooks/useGetRegistrationForm";
import FormInput from "../Common/Form/FormInput";
import FormButton from '../Common/Button/FormButton';
import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import { StepButtonWrapper, StepTitle } from "../Common/Form/WizardForm";

export default function RegistrationStepThree({ setStep }) {

    const { setValue, getValues } = useFormContext();
    const { images, thumbnail } = useGetRegistrationForm();

    const [ imagePreviews, setImagePreviews ] = useState([]);

    const handleSetImagePreviews = (images) => {
        if (!images) return;

        const newPreviews = [];
        for (const index in images) {
            const file = images[index];
            if (typeof file === 'object') {
                const imageSrc = URL.createObjectURL(images[index]);
                newPreviews.push(imageSrc);
            }
        }

        setImagePreviews(newPreviews);
    };

    const handleImagesChange = (event) => {
        const images = event.target.files;
        handleSetImagePreviews(images);
    };

    const handleOnImagePreviewSelect = (image, index) => {
        setValue("thumbnail", index);
    };

    const handleOnAttachmentRemove = (e, index) => {
        const newImagePreviews = imagePreviews.filter((preview, i) => i !== index);
        setImagePreviews(newImagePreviews);
        
        if (index === getValues("thumbnail")) {
            setValue("thumbnail", '');
        } else if (index < getValues("thumbnail")) {
            setValue("thumbnail", getValues("thumbnail") - 1);
        }
    };

    useEffect(() => {
        const images = getValues("images");
        handleSetImagePreviews(images);

        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, []);

    return (
        <>
            <StepTitle>장소의 이미지를 첨부하고<br/>썸네일을 선택해주세요</StepTitle>

            <FormInput 
                type="file" field={ images }
                accept="image/*"
                onChange={ handleImagesChange }
                multiple={ true }
                onAttachmentRemove={ handleOnAttachmentRemove }
            />
            
            <Carousel sources={ imagePreviews } onSelect={ handleOnImagePreviewSelect } selectedIndex={ getValues("thumbnail") } />

            {
                imagePreviews?.length > 0 && (
                    <FormInput type="hidden" size="l" field={ thumbnail } />
                )
            }

            <StepButtonWrapper>
                <FormButton direction="prev" size="l" onClick={ () => setStep(2) } />
                <FormButton type="submit" direction="next" size="l" text="제출" icon={ false } />
            </StepButtonWrapper>
        </>
    )
}