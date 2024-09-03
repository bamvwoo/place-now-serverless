import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import ImageUploader from "../components/Registration/ImageUploader";
import AddressSelector from "../components/Registration/AddressSelector";

const RootContainer = styled.main`
    form {
        width: 100%;
        height: 100%;
        padding: 10% 20%;
    }

    form > div {
        width: 100%;
    }
`;

const FormInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);

    input[type=text], input[type=file], select {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid var(--main-std-dark-color);
        border-radius: 5px;
        background-color: #fff;
    }
`;

const FormButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    
    &[has:button[type="button"]] {
        justify-content: space-between;
    }

    button {
        width: 48%;
        height: 100%;
        border: 1px solid var(--main-std-dark-color);
        border-radius: 5px;
        cursor: pointer;

        &[type="submit"] {
            background-color: blue;
        }
    }
`;

export default function Registration() {
    const methods = useForm();
    const { register, handleSubmit, getValues, formState: { errors } } = methods;

    const [ step, setStep ] = useState(1);

    const onValid = (data) => {
        setStep(step + 1);
    };

    const onInvalid = (errors) => {
        console.log(errors);
        for (const key in errors) {
            // errors[key].ref
        }
    };

    useEffect(() => {
    });

    return (
        <FormProvider {...methods}>
            <RootContainer>
                <form onSubmit={ handleSubmit(onValid, onInvalid) }>
                    <FormInputContainer>
                    {
                        step === 1 ? (
                            <>
                                <h4>이 장소가 어디에 있나요?</h4>
                                <AddressSelector />
                            </>
                        ) : null
                    }
                    {
                        step === 2 ? (
                            <>
                                <input type="text"
                                    placeholder="장소명"
                                    { 
                                        ...register("name", {
                                            required: '장소명을 입력해주세요',
                                            maxLength: { value: 50, message: '장소명은 최대 50자까지 입력할 수 있어요' }
                                        })
                                    }
                                    value={ getValues("detailedAddress") }
                                />
                                { errors.name ? <p>{ errors.name.message }</p> : null }

                                <label>
                                    <input type="checkbox"
                                        {
                                            ...register("admin")
                                        }
                                    />

                                    이 장소의 관리자예요
                                    <i className="fa-solid fa-circle-question"></i>
                                </label>
                            </>
                        ) : null
                    }

                    {
                        step === 3 ? (
                            <ImageUploader required="장소 이미지를 첨부해주세요" thumbnailEnabled={ true } />
                        ) : null
                    }
                    </FormInputContainer>

                    <FormButtonContainer>
                        {
                            step > 1 ? (
                                <button type="button" onClick={ () => { setStep(step - 1) } } >이전</button>
                            ) : null
                        }
                        <button type="submit">{ step === 3 ? "등록" : "다음" }</button>
                    </FormButtonContainer>
                </form>
            </RootContainer>
        </FormProvider>
    )
}