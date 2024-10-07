import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ResultContent from "../components/Common/ResultContent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);

    input[type=text], input[type=password], input[type=email], select {
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

export default function Signup() {

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [ step, setStep ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);

    const validateUserId = (event) => {
        event.preventDefault();

        event.target.disabled = true;

        const userId = getValues("userId");
        if (userId) {
            axios.get("/api/user", {
                params: {
                    userId: userId
                }
            })
            .then(response => {
                // 사용자가 존재하는 경우
                setValue("isDuplicated", "true");
                alert("이미 존재하는 아이디에요");
            }).catch(error => {
                // 사용자가 존재하지 않는 경우
                setValue("isDuplicated", "false");
                alert("사용 가능한 아이디에요");
            });
        }

        event.target.disabled = false;
    };

    const getRandomUserName = (event) => {
        event.preventDefault();

        event.target.disabled = true;

        axios.get("/api/common/random")
        .then(response => {
            setValue("name", response.data.name);
        });

        event.target.disabled = false;
    };

    const onValid = (data) => {
        if (step == 1) {
            setIsLoading(true);

            axios.post("/api/user", data)
            .then(response => {
                setIsLoading(false);
                setStep(step + 1);
            });
        } else {
            setStep(step + 1);
        }
    };

    const onInvalid = (errors) => {
        console.log(errors);
    };

    return (
        <form onSubmit={ handleSubmit(onValid, onInvalid) }>
            <FormInputContainer>
                {
                    step === 1 && (
                        <>
                            <h4>가입 정보를 입력해주세요</h4>
                            <div>
                                <input type="text"
                                    placeholder="아이디"
                                    { 
                                        ...register("userId", {
                                            required: '아이디를 입력해주세요',
                                            maxLength: { value: 20, message: '아이디는 최대 20자까지 입력할 수 있어요' }
                                        })
                                    }
                                    onChange={ (event) => setValue("isDuplicated", "") }
                                />
                                <button type="button" onClick={ validateUserId }>중복체크</button>
                                
                                <input type="hidden"
                                    { 
                                        ...register("isDuplicated", {
                                            required: '아이디 중복체크를 해주세요',
                                            validate: {
                                                isMatch: value => value === "false" || '아이디가 이미 존재해요'
                                            }
                                        })
                                    }
                                />
                            </div>
                            { errors.userId ? <p>{ errors.userId.message }</p> : null }
                            { errors.isDuplicated ? <p>{ errors.isDuplicated.message }</p> : null }

                            <input type="text"
                                placeholder="이름"
                                { 
                                    ...register("name", {
                                        required: '이름을 입력해주세요',
                                        maxLength: { value: 20, message: '이름은 최대 20자까지 입력할 수 있어요' }
                                    })
                                }
                            />
                            <button type="button" onClick={ getRandomUserName }>자동생성</button>
                            { errors.name ? <p>{ errors.name.message }</p> : null }

                            <input type="password"
                                placeholder="비밀번호"
                                { 
                                    ...register("password", {
                                        required: '비밀번호를 입력해주세요',
                                        minLength: { value: 8, message: '비밀번호는 최소 8자 이상 입력해주세요' },
                                        maxLength: { value: 20, message: '비밀번호는 최대 20자까지 입력할 수 있어요' },
                                        validate: {
                                            hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || '비밀번호에는 하나 이상의 특수문자가 포함되어야 해요',
                                            hasNumber: value => /\d/.test(value) || '비밀번호에는 하나 이상의 숫자가 포함되어야 해요',
                                            hasAlphabet: value => /[a-zA-Z]/.test(value) || '비밀번호에는 하나 이상의 영문자가 포함되어야 해요'
                                        }
                                    })
                                }
                            />
                            { errors.password ? <p>{ errors.password.message }</p> : null }

                            <input type="password"
                                placeholder="비밀번호 확인"
                                { 
                                    ...register("passwordConfirm", {
                                        required: '비밀번호 확인을 입력해주세요',
                                        validate: {
                                            isMatch: value => value === getValues("password") || '비밀번호가 일치하지 않아요'
                                        }
                                    })
                                }
                            />
                            { errors.passwordConfirm ? <p>{ errors.passwordConfirm.message }</p> : null }

                            <input type="text"
                                placeholder="이메일"
                                { 
                                    ...register("email", {
                                        required: '이메일을 입력해주세요',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: '이메일 형식에 맞게 입력해주세요'
                                        }
                                    })
                                }
                            />
                            { errors.email ? <p>{ errors.email.message }</p> : null }
                        </>
                    )
                }

                {
                    step === 2 && isLoading && (
                        <ResultContent loading={ true } />
                    )
                }

                {
                    step === 2 && !isLoading && (
                        <ResultContent success={
                            { 
                                title: "가입이 완료되었어요", 
                                subTitle: "입력한 정보로 로그인해주세요" 
                            }}
                            loop="false"
                        />
                    )
                }
            </FormInputContainer>
            <FormButtonContainer>
                {
                    step === 1 && (
                        <button type="submit">다음</button>
                    )
                }

                {
                    step === 2 && (
                        <button type="button" onClick={ () => navigate('/login') }>로그인하기</button>
                    )
                }
            </FormButtonContainer>
        </form>
    )
}