import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../../hooks/useGetRegistrationForm";
import { StepButtonWrapper, StepTitle } from "../WizardForm"
import FormInput from "../../Common/Form/FormInput";
import FormButton from '../../Common/Button/FormButton';
import Tooltip from "../../Common/Tooltip";

export default function WizardStepOne({ setStep }) {

    const { control, trigger } = useFormContext();
    const { name, isAdmin } = useGetRegistrationForm({ control });

    const handleOnNextButtonClick = async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "name", "isAdmin" ]);
        if (isValid) {
            setStep(3);
        }
    }

    return (
        <>
            <StepTitle>이 장소가 어디에 있나요?</StepTitle>

            <FormInput type="text" size="l" field={ name } 
                placeholder="장소명"
            />

            <FormInput
                type="checkbox" size="l" field={ isAdmin }
                label={ <Tooltip title="이 장소의 관리자예요" text="이 장소의 관리자는 할 수 있어요." /> }
            />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" text="취소" icon={ false } onClick={ () => setStep(1) } />
                <FormButton direction="next" $size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}