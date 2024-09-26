import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormInput from '../Common/Form/FormInput';
import { useWindow } from '../../context/WindowContext';

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DaumPostCodeWrapper = styled.div`
    width: 30vw;
    height: 60vh;
`;

export default function AddressSelector() {

    const { register, formState: { errors }, setValue } = useFormContext();

    const { openModal, closeModal } = useWindow();

    const applyAddress = (data) => {
        setValue("address", data.address);
        setValue("postCode", data.zonecode);
        setValue("detailedAddress", `${data.buildingName}`);

        closeModal();
    };

    const openDaumPostCodeModal = () => {
        openModal(null, <DaumPostCodeWrapper><DaumPostcode onComplete={ applyAddress } autoClose={ false } style={{ width: "100%", height: "100%" }} /></DaumPostCodeWrapper>);
    };

    return (
        <RootContainer>
            <FormInput type="text" name="postCode"
                placeholder="우편번호"
                required="우편번호를 입력해주세요"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
            />
            { errors.postCode ? <p>{ errors.postCode.message }</p> : null }

            <input type="text"
                placeholder="주소"
                { 
                    ...register("address", {
                        required: '주소를 입력해주세요',
                        readOnly: true
                    })
                }
                onClick={ openDaumPostCodeModal }
                readOnly
            />
            { errors.address ? <p>{ errors.address.message }</p> : null }

            <input type="text"
                placeholder="상세주소"
                { 
                    ...register("detailedAddress")
                }
            />
        </RootContainer>
    )
}