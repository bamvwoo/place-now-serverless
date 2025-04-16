import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import useGetRegistrationForm from "../../hooks/useGetRegistrationForm";
import FormInput from "../Common/Form/FormInput";
import { useWindow } from "../../context/WindowContext";
import styled from "styled-components";
import FormButton from '../Common/Button/FormButton';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { StepButtonWrapper, StepTitle } from '../Common/Form/WizardForm';

const DaumPostCodeWrapper = styled.div`
    width: 30vw;
    height: 60vh;
`;

export default function RegistrationStepOne({ setStep }) {

    const { setValue, trigger } = useFormContext();
    const { postCode, address, buildingName } = useGetRegistrationForm();

    const navigate = useNavigate();
    const { openModal, closeModal } = useWindow();

    const applyAddress = (data) => {
        console.log(data);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(data.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const lat = result[0].y;
                const lng = result[0].x;

                setValue("lat", lat);
                setValue("lng", lng);
            }
        });

        setValue("sido", data.sido);
        setValue("sigungu", data.sigungu);
        setValue("address", data.address);
        setValue("postCode", data.zonecode);
        setValue("buildingName", data.buildingName);

        closeModal();
    };

    const openDaumPostCodeModal = () => {
        openModal(null, <DaumPostCodeWrapper><DaumPostcode onComplete={ applyAddress } autoClose={ false } style={{ width: "100%", height: "100%" }} /></DaumPostCodeWrapper>);
    };

    const handleOnNextButtonClick = useCallback(async (e) => {
        e.preventDefault();

        const isValid = await trigger([ "postCode", "address", "buildingName" ]);
        if (isValid) {
            setStep(2);
        }
    }, [ setStep, trigger ]);

    return (
        <>
            <StepTitle>이 장소가 어디에 있나요?</StepTitle>

            <FormInput type="text" size="l" field={ postCode } 
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
            />

            <FormInput
                type="text" size="l" field={ address }
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
            />

            <FormInput type="text" size="l" field={ buildingName } />

            <StepButtonWrapper>
                <FormButton direction="prev" size="l" text="취소" icon={ false } onClick={ () => navigate(-1) } />
                <FormButton direction="next" size="l" onClick={ handleOnNextButtonClick } />
            </StepButtonWrapper>
        </>
    )
}