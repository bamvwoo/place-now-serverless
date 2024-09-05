import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormContainer from "../components/Common/Form/FormContainer";
import FormInputContainer from "../components/Common/Form/FormInputContainer";
import FormButtonContainer from "../components/Common/Form/FormButtonContainer";

export default function Login() {
    const methods = useForm();
    const { register, getValues, setValue, formState: { errors } } = methods;
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
        <FormContainer methods={ methods } onValid={ onValid } onInvalid={ onInvalid }>
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
                <button type="button" onClick={ () => navigate('/signup') }>등록</button>
                <button type="submit">로그인</button>
            </FormButtonContainer>
        </FormContainer>
    )
}