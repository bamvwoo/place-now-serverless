import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../../hooks/useGetRegistrationForm";
import { StepButtonWrapper, StepTitle } from "../WizardForm"
import FormInput from "../../Common/Form/FormInput";
import FormButton from '../../Common/Button/FormButton';
import { useEffect, useState } from "react";
import Carousel from "../../Carousel";

export default function WizardStepThree({ setStep }) {

    const { setValue } = useFormContext();
    const { images, thumbnail } = useGetRegistrationForm();

    const [ imagePreviews, setImagePreviews ] = useState([]);

    const handleImagesChange = (event) => {
        const files = event.target.files;
        
        const newPreviews = [];
        for (const index in files) {
            const file = files[index];
            if (typeof file === 'object') {
                const imageSrc = URL.createObjectURL(files[index]);
                newPreviews.push(imageSrc);
            }
        }

        setImagePreviews(newPreviews);
    };

    const handleOnImagePreviewSelect = (image, index) => {
        setValue("thumbnail", index);
    };

    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [ imagePreviews ]);

    return (
        <>
            <StepTitle>장소의 이미지를 첨부하고<br/>썸네일을 선택해주세요</StepTitle>

            <FormInput 
                type="file" field={ images }
                accept="image/*"
                onChange={ handleImagesChange }
                multiple={ true }
            />

            {
                imagePreviews?.length > 0 && (
                    <FormInput type="hidden" field={ thumbnail } />
                )
            }

            <Carousel sources={ imagePreviews } onSelect={ handleOnImagePreviewSelect } />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" onClick={ () => setStep(2) } />
                <FormButton type="submit" direction="next" $size="l" text="제출" icon={ false } />
            </StepButtonWrapper>
        </>
    )
}