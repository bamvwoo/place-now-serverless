import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../../hooks/useGetRegistrationForm";
import { StepButtonWrapper, StepTitle } from "../WizardForm"
import FormInput from "../../Common/Form/FormInput";
import FormButton from '../../Common/Button/FormButton';
import Tooltip from "../../Common/Tooltip";
import { useEffect } from "react";

export default function WizardStepTwo({ setStep }) {

    const { trigger, setValue, getValues } = useFormContext();
    const { name, isAdmin } = useGetRegistrationForm();

    const handleOnNextButtonClick = async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "name", "isAdmin" ]);
        if (isValid) {
            setStep(3);
        }
    }

    useEffect(() => {
        setValue("name", getValues("detailedAddress") || "");
    }, []);

    return (
        <>
            <StepTitle>장소의 이름을 입력해주세요</StepTitle>

            <FormInput type="text" size="l" field={ name } 
                placeholder="장소명"
            />

            <FormInput
                type="checkbox" size="l" field={ isAdmin }
                label={ 
                    <>  
                        이 장소의 관리자예요
                        <Tooltip 
                            text={ 
                                <>
                                    관리자로 승인되면 채팅방에서 특별한 배지 <i className='fa-solid fa-certificate'></i> 가 부여되고 <br/>
                                    예약을 받거나 장소 정보를 직접 수정할 수 있어요
                                </> 
                            }
                        /> 
                    </>
                }
            />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" onClick={ () => setStep(1) } />
                <FormButton direction="next" $size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}