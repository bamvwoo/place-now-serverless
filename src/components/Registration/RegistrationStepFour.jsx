import FormButton from "../Common/Button/FormButton";
import { StepButtonWrapper } from "../Common/Form/WizardForm";
import ResultContent from "../Common/ResultContent";

export default function RegistrationStepFour() {
    return (
        <>
            <ResultContent success={{ title: "등록 신청이 완료되었어요", subTitle: "등록이 승인되면 이메일로 알려드릴게요" }} loop="false" />

            <StepButtonWrapper>
                <FormButton direction="prev" size="l" text="완료" icon={ false } onClick={ () => window.location.href = '/' } />
            </StepButtonWrapper>
        </>
    )
}