import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormContainer from "../components/Common/Form/FormContainer";
import FormContentContainer from "../components/Common/Form/FormContentContainer";
import FormButtonContainer from "../components/Common/Form/FormButtonContainer";
import { useState } from "react";
import FormInput from "../components/Common/Form/FormInput";

export default function Login() {
    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues } = methods;

    const navigate = useNavigate();
    const { login } = useAuth();

    const [ isCorrect, setIsCorrect ] = useState(null);

    const onValid = async (data) => {
        const { userId, password } = getValues();

        login(userId, password)
            .then((result) => {
                navigate(-1);
            })
            .catch((error) => {
                setIsCorrect(false);
            });
    };

    const onInvalid = (errors) => {
    };

    return (
        <FormContainer methods={ methods } onValid={ onValid } onInvalid={ onInvalid }>
            <FormContentContainer>
                <p>또는</p>

                { isCorrect !== null && !isCorrect && <span>아이디와 비밀번호를 확인해주세요</span> }

                <FormInput type="text" name="userId" required="아이디를 입력해주세요" placeholder="아이디" />
                <FormInput type="password" name="password" required="비밀번호를 입력해주세요" placeholder="비밀번호" />
            </FormContentContainer>

            <FormButtonContainer>
                <button type="submit">로그인</button>
            </FormButtonContainer>
        </FormContainer>
    )
}