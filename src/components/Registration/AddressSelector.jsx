import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function AddressSelector() {

    const { register, formState: { errors }, setValue } = useFormContext();

    const [ isOpen, setIsOpen ] = useState(false);

    const applyAddress = (data) => {
        setValue("address", data.address);
        setValue("postCode", data.zonecode);
        setValue("detailedAddress", `(${data.buildingName})`);
    };

    return (
        <RootContainer>
            <input type="text"
                placeholder="우편번호"
                { 
                    ...register("postCode", {
                        required: '우편번호를 입력해주세요'
                    })
                }
                onClick={ () => { setIsOpen(!isOpen) } }
                readOnly
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
                onClick={ () => { setIsOpen(!isOpen) } }
                readOnly
            />
            { errors.address ? <p>{ errors.address.message }</p> : null }

            <input type="text"
                placeholder="상세주소"
                { 
                    ...register("detailedAddress")
                }
            />

            {
                isOpen ?
                <div>
                    <DaumPostcode 
                        onComplete={ applyAddress }
                        autoClose={false}
                    />
                </div> : null
            }
            { errors.address ? <p>{ errors.address.message }</p> : null }
        </RootContainer>
    )
}