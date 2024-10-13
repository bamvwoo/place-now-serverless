import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../hooks/useGetRegistrationForm";
import FormInput from "../Common/Form/FormInput";
import FormButton from '../Common/Button/FormButton';
import Tooltip from "../Common/Tooltip";
import { StepButtonWrapper, StepTitle } from "../Common/Form/WizardForm";

export default function RegistrationStepTwo({ setStep }) {

    const { trigger, getValues } = useFormContext();
    const { name, isAdmin, description } = useGetRegistrationForm();

    const handleOnNextButtonClick = async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "name", "description", "isAdmin" ]);
        if (isValid) {
            setStep(3);
        }

        console.log(getValues());
    }

    return (
        <>
            <StepTitle>장소의 이름과 설명을 입력해주세요</StepTitle>

            <FormInput type="text" size="l" field={ name } />

            <FormInput type="checkbox" size="l" field={ isAdmin }
                label={ 
                    <>  
                        이 장소의 관리자예요
                        <Tooltip 
                            text={ 
                                <>
                                    관리자로 승인되면 채팅방에서 특별한 배지 <i className='fa-solid fa-certificate'></i> 가 부여되고 <br/>
                                    예약을 받거나 장소를 직접 관리할 수 있어요
                                </> 
                            }
                        /> 
                    </>
                }
            />
            
            <FormInput type="textarea" size="l" field={ description } />


            <StepButtonWrapper>
                <FormButton direction="prev" size="l" onClick={ () => setStep(1) } />
                <FormButton direction="next" size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}