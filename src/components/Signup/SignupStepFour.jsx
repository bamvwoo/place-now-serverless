import FormButton from "../Common/Button/FormButton";
import { StepButtonWrapper } from "../Common/Form/WizardForm";
import ResultContent from "../Common/ResultContent";

export default function SignupStepFour() {
    return (
        <>
            <ResultContent success={{ title: "등록이 완료되었어요", subTitle: "이제 로그인하고 서비스를 이용해보세요" }} loop="false" />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" text="완료" icon={ false } onClick={ () => window.location.href = '/' } />
            </StepButtonWrapper>
        </>
    )
}