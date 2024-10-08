import { StepButtonWrapper, StepTitle } from '../Common/Form/WizardForm';
import FormButton from '../Common/Button/FormButton';
import FormInput from '../Common/Form/FormInput';
import useGetSignupForm from '../../hooks/useGetSignupForm';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function SignupStepThree({ setStep }) {

    const { setValue } = useFormContext();
    const { name } = useGetSignupForm();

    const [ isProcessing, setIsProcessing ] = useState(false);

    const generateRandomName = (e) => {
        setIsProcessing(true);

        axios.get('/api/common/random').then(response => {
            setIsProcessing(false);
            setValue('name', response.data);
        });
    };

    return (
        <>
            <StepTitle>
                {
                    <>자신을 나타내는 별명을 지어주세요</>
                }
            </StepTitle>

            <FormInput type="text" size="l" field={ name } />
            <FormButton type="button" width="100%" onClick={ generateRandomName } disabled={ isProcessing }>
                {
                    isProcessing ?
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                        <>자동 생성</>
                }
            </FormButton>

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" onClick={ () => setStep(2) } />
                <FormButton type="submit" $size="l" icon={ false } text="제출" />
            </StepButtonWrapper>
        </>
    )
}