import { useFormContext } from "react-hook-form";
import { StepButtonWrapper, StepTitle } from "../WizardForm"
import FormButton from '../../Common/Button/FormButton';
import FieldInput from "./FieldInput";

export default function WizardStepThree({ setStep }) {

    const { trigger } = useFormContext();

    const handleOnNextButtonClick = async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "test" ]);
        if (isValid) {
            setStep(3);
        }
    }

    return (
        <>
            <StepTitle>이 장소가 어디에 있나요?</StepTitle>

            <FieldInput name="test" />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" text="취소" icon={ false } onClick={ () => setStep(1) } />
                <FormButton direction="next" $size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}