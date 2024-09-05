import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import ImageUploader from "../components/Registration/ImageUploader";
import AddressSelector from "../components/Registration/AddressSelector";
import { axiosInstance } from "../context/AuthContext";
import ResultContent from "../components/Common/ResultContent";
import { useNavigate } from "react-router-dom";

const RootContainer = styled.main`
    form {
        width: 100%;
        height: 100%;
        padding: 15% 30%;
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
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    h4 {
        margin-bottom: 15px;
        font-size: 1.5rem;
        font-weight: 600;
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
        width: calc(50% - 10px);
        height: 100%;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
        background-color: #e2e2e2;

        &[type="submit"] {
            background-color: var(--main-std-blue-color);
            margin-left: 10px;
        }
    }
`;

export default function Registration() {
    const methods = useForm();
    const { register, handleSubmit, getValues, formState: { errors } } = methods;
    const navigate = useNavigate();

    const [ step, setStep ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);

    const onValid = (data) => {
        if (step === 3) {
            setIsLoading(true);

            const formData = new FormData();
            for (const key in data) {
                if (key === 'images') {
                    Array.from(data[key]).forEach(file => {
                        formData.append('images', file);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }

            axiosInstance.post('/api/place', formData)
            .then((response) => {
                setIsLoading(false);
                setStep(step + 1);
            });
        } else if (step === 4) {
            navigate('/');
        } else {
            setStep(step + 1);
        }
    };

    const onInvalid = (errors) => {
        console.log(errors);
        for (const key in errors) {
            // errors[key].ref
        }
    };

    return (
        <FormProvider {...methods}>
            <RootContainer>
                <form onSubmit={ handleSubmit(onValid, onInvalid) }>
                    <FormInputContainer>
                        
                    {
                        step === 0 && (
                            <>
                            </>
                        )
                    }

                    {
                        step === 1 && (
                            <>
                                <h4>이 장소가 어디에 있나요?</h4>
                                <AddressSelector />
                            </>
                        )
                    }

                    {
                        step === 2 && (
                            <>
                                <h4>장소의 이름을 입력해주세요</h4>
                                <input type="text"
                                    placeholder="장소명"
                                    { 
                                        ...register("name", {
                                            required: '장소명을 입력해주세요',
                                            maxLength: { value: 50, message: '장소명은 최대 50자까지 입력할 수 있어요' }
                                        })
                                    }
                                    defaultValue={ getValues("detailedAddress") }
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
                        )
                    }

                    {
                        step === 3 && !isLoading && (
                            <>
                                <h4>장소 이미지를 첨부해주세요</h4>
                                <ImageUploader required="장소 이미지를 첨부해주세요" thumbnailEnabled={ true } />
                            </>
                        )
                    }

                    {
                        step === 3 && isLoading && (
                            <ResultContent loading={ true } />
                        )
                    }

                    {
                        step === 4 && (
                            <ResultContent success={
                                { 
                                    title: "등록 신청이 완료되었어요", 
                                    subTitle: "등록이 승인되면 이메일로 알려드릴게요" 
                                }}
                                loop="false"
                            />
                        )
                    }
                    </FormInputContainer>

                    <FormButtonContainer>
                        { 
                            !isLoading && (
                                <>
                                    {
                                        (step > 1 && step < 4) && (
                                            <button type="button" onClick={ () => { setStep(step - 1) } } >이전</button>
                                        )
                                    }

                                    <button type="submit">
                                        { 
                                            step < 3 ? "다음" : 
                                            step < 4 ? "등록" : 
                                            "완료" 
                                        }
                                    </button>
                                </>
                            )
                        }
                    </FormButtonContainer>
                </form>
            </RootContainer>
        </FormProvider>
    )
}