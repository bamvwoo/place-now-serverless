import { StepButtonWrapper, StepTitle } from '../Common/Form/WizardForm';
import FormButton from '../Common/Button/FormButton';
import { useFormContext } from 'react-hook-form';
import FormInput from '../Common/Form/FormInput';
import useGetSignupForm from '../../hooks/useGetSignupForm';
import { useEffect, useState } from 'react';

export default function SignupStepTwo({ setStep }) {

    const { trigger, getValues, setValue } = useFormContext();
    const { password, passwordConfirm } = useGetSignupForm();

    const [ isPasswordMatch, setIsPasswordMatch ] = useState(getValues('isPasswordMatch'));

    const handleOnKeyUp = async (e) => {
        const isPasswordValid = await trigger("password");
        const isPasswordConfirmValid = await trigger("passwordConfirm");

        const isPasswordMatch = isPasswordValid && isPasswordConfirmValid;
        setValue('isPasswordMatch', isPasswordMatch);
        setIsPasswordMatch(isPasswordMatch);
    }

    useEffect(() => {}, [ isPasswordMatch ]);

    return (
        <>
            <StepTitle>
                {
                    isPasswordMatch ?
                        <>적절한 비밀번호예요<br />다음 단계를 진행해주세요</> : 
                        <>영문•숫자•특수문자를 포함하는<br />비밀번호를 입력해주세요</>
                }
            </StepTitle>

            <FormInput type="password" size="l" field={ password } onKeyUp={ handleOnKeyUp } />
            <FormInput type="password" size="l" field={ passwordConfirm } onKeyUp={ handleOnKeyUp } />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" onClick={ () => setStep(1) } />
                {
                    isPasswordMatch &&
                        <FormButton direction="next" $size="l" onClick={ () => setStep(3) } />
                }
            </StepButtonWrapper>
        </>
    )
}