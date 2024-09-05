import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

export default function Login() {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        setValue("isCorrect", "");

        const { userId, password } = getValues();
        try {
            await login(userId, password);
            setValue("isCorrect", "true");
            return true;
        } catch(error) {
            setValue("isCorrect", "false");
            return false;
        }
    };

    const onValid = (data) => {
        navigate(-1);
    };

    const onInvalid = (errors) => {
    };

    return (
        <RootContainer>
            <form onSubmit={ handleSubmit(onValid, onInvalid) }>
                <FormInputContainer>
                    <input type="text" 
                        placeholder="아이디" 
                        { 
                            ...register("userId", { 
                                required: "아이디를 입력해주세요" 
                            }) 
                        } 
                    />
                    { errors.userId && <span>{ errors.userId.message }</span> }

                    <input type="password"
                        placeholder="비밀번호"
                        { 
                            ...register("password", { 
                                required: "비밀번호를 입력해주세요" 
                            }) 
                        }
                    />
                    { errors.password && <span>{ errors.password.message }</span> }

                    <input type="hidden"
                        { 
                            ...register("isCorrect", {
                                required: "아이디와 비밀번호를 확인해주세요",
                                validate: async () => {
                                    const isValid = await handleLogin();
                                    return isValid || "아이디와 비밀번호를 확인해주세요";
                                }
                            }) 
                        }
                    />
                    { errors.isCorrect && <span>{ errors.isCorrect.message }</span> }
                </FormInputContainer>

                <FormButtonContainer>
                    <button type="button" onClick={ () => navigate('/signup') }>회원가입</button>
                    <button type="submit">로그인</button>
                </FormButtonContainer>
            </form>
        </RootContainer>
    )
}