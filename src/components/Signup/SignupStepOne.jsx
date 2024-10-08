import { useNavigate } from 'react-router-dom';
import EmailVerifier from '../Common/Form/EmailVerifier';
import { StepButtonWrapper, StepTitle } from '../Common/Form/WizardForm';
import { useState } from 'react';
import FormButton from '../Common/Button/FormButton';
import { useFormContext } from 'react-hook-form';

export default function SignupStepOne({ setStep }) {

    const { getValues } = useFormContext();
    const navigate = useNavigate();
    
    const [ isSent, setIsSent ] = useState(false);

    return (
        <>
            <StepTitle>
                {
                    isSent ?
                        <>이메일로 전송된<br />인증코드를 입력해주세요</> :
                        <>계정으로 사용할<br />이메일 주소를 입력해주세요</>
                }
            </StepTitle>

            <EmailVerifier isSent={ isSent } setIsSent={ setIsSent } />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" text="취소" icon={ false } onClick={ () => navigate(-1) } />
                {
                    getValues("isVerified") &&
                        <FormButton direction="next" $size="l" onClick={ () => setStep(2) } />
                }
            </StepButtonWrapper>
        </>
    )
}