import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../components/Registration/ImageUploader";
import AddressSelector from "../components/Registration/AddressSelector";
import { axiosInstance } from "../context/AuthContext";
import ResultContent from "../components/Common/ResultContent";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/Common/Form/FormContainer";
import FormContentContainer from "../components/Common/Form/FormContentContainer";
import FormButtonContainer from "../components/Common/Form/FormButtonContainer";

export default function Registration() {
    const methods = useForm();
    const { register, getValues, formState: { errors } } = methods;
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
        <FormContainer methods={ methods } onValid={ onValid } onInvalid={ onInvalid } wide={ true }>
            <FormContentContainer>
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
            </FormContentContainer>

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
        </FormContainer>
    )
}