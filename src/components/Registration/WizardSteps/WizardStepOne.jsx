import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../../hooks/useGetRegistrationForm";
import { StepButtonWrapper, StepTitle } from "../WizardForm"
import FormInput from "../../Common/Form/FormInput";
import { useWindow } from "../../../context/WindowContext";
import styled from "styled-components";
import FormButton from '../../Common/Button/FormButton';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const DaumPostCodeWrapper = styled.div`
    width: 30vw;
    height: 60vh;
`;

export default function WizardStepOne({ setStep }) {

    const { setValue, trigger } = useFormContext();
    const { postCode, address, detailedAddress } = useGetRegistrationForm();

    const navigate = useNavigate();
    const { openModal, closeModal } = useWindow();

    const applyAddress = (data) => {
        setValue("address", data.address);
        setValue("postCode", data.zonecode);
        setValue("detailedAddress", data.buildingName);
        setValue("region", data.sido);

        closeModal();
    };

    const openDaumPostCodeModal = () => {
        openModal(null, <DaumPostCodeWrapper><DaumPostcode onComplete={ applyAddress } autoClose={ false } style={{ width: "100%", height: "100%" }} /></DaumPostCodeWrapper>);
    };

    const handleOnNextButtonClick = useCallback(async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "postCode", "address", "detailedAddress" ]);
        if (isValid) {
            setStep(2);
        }
    }, [ setStep, trigger ]);

    return (
        <>
            <StepTitle>이 장소가 어디에 있나요?</StepTitle>

            <FormInput type="text" size="l" field={ postCode } 
                placeholder="우편번호"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
            />

            <FormInput
                type="text" size="l" field={ address }
                placeholder="주소"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
            />

            <FormInput 
                type="text" size="l" field={ detailedAddress }
                placeholder="상세주소"
            />

            <StepButtonWrapper>
                <FormButton direction="prev" $size="l" text="취소" icon={ false } onClick={ () => navigate(-1) } />
                <FormButton direction="next" $size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}