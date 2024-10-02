import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormInput from '../Common/Form/FormInput';
import { useWindow } from '../../context/WindowContext';
import { VerticalWrapper } from '../Common/Wrapper';
import useGetRegistrationForm from '../../hooks/useGetRegistrationForm';

const Wrapper = styled(VerticalWrapper)`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
`;

const DaumPostCodeWrapper = styled.div`
    width: 30vw;
    height: 60vh;
`;

export default function AddressSelector() {

    const { setValue, control } = useFormContext();
    const { postCode, address, detailedAddress } = useGetRegistrationForm({ control });

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

    return (
        <Wrapper>
            <FormInput
                type="text" name="postCode"
                field={ postCode }
                placeholder="우편번호"
                required="우편번호를 입력해주세요"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
                size="l"
            />

            <FormInput
                type="text" name="address"
                field={ address }
                placeholder="주소"
                required="주소를 입력해주세요"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
                size="l"
            />

            <FormInput 
                type="text" name="detailedAddress"
                field={ detailedAddress }
                placeholder="상세주소"
                size="l"
            />
        </Wrapper>
    )
}