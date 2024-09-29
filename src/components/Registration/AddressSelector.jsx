import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormInput from '../Common/Form/FormInput';
import { useWindow } from '../../context/WindowContext';
import { VerticalWrapper } from '../Common/Wrapper';

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

    const { register, formState: { errors }, setValue } = useFormContext();

    const { openModal, closeModal } = useWindow();

    const applyAddress = (data) => {
        console.log(data);

        setValue("address", data.address);
        setValue("postCode", data.zonecode);
        setValue("detailedAddress", `${data.buildingName}`);

        closeModal();
    };

    const openDaumPostCodeModal = () => {
        openModal(null, <DaumPostCodeWrapper><DaumPostcode onComplete={ applyAddress } autoClose={ false } style={{ width: "100%", height: "100%" }} /></DaumPostCodeWrapper>);
    };

    return (
        <Wrapper>
            <FormInput
                type="text" name="postCode"
                placeholder="우편번호"
                required="우편번호를 입력해주세요"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
                size="l"
            />

            <FormInput
                type="text" name="address"
                placeholder="주소"
                required="주소를 입력해주세요"
                onClick={ openDaumPostCodeModal }
                readOnly={ true }
                size="l"
            />

            <FormInput 
                type="text" name="detailedAddress"
                placeholder="상세주소"
                size="l"
            />
        </Wrapper>
    )
}