import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Form from "../Common/Form/Form";
import { useEffect, useState } from "react";
import FormInput from "../Common/Form/FormInput";
import GoogleOAuthContainer from "./GoogleOAuthContainer";
import NaverOAuthContainer from "./NaverOAuthContainer";
import axios from "axios";
import { VerticalWrapper } from "../Common/Wrapper";
import useGetLoginForm from "../../hooks/useGetLoginForm";
import FormButton from "../Common/Button/FormButton";

const OrText = styled.p`
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
`;

const OptionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    width: 100%;
    margin: 20px 0 15px 0;
    gap: 15px;

    & > li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    & > li > a {
        color: #111;
        font-weight: 600;
        text-decoration: underline;
        margin-left: 5px;
    }
`;

const InvalidText = styled.p`
    width: 100%;
    color: red;
    font-size: 0.8rem;
    margin-bottom: 5px;
`;

const AuthContainer = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;
    gap: 5px;

    & > a {
        margin: 10px 0 10px auto;
        font-size: 0.8rem;
        font-weight: 600;
    }
`;

export default function Login({ successUrl }) {
    successUrl = successUrl || "/";

    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues, setValue, trigger } = methods;

    const { login } = useAuth();

    const { email, password, isLoginSuccess } = useGetLoginForm();

    const [ isProcessing, setIsProcessing ] = useState(false);

    const handleOnLogin = async (e) => {
        setIsProcessing(true);

        const isValid = await trigger(['email', 'password']);
        if (!isValid) {
            setIsProcessing(false);
            return;
        }

        const { email, password } = getValues();

        axios.post("/api/auth/basic", { email, password })
        .then(async (response) => {
            const token = response.data.token;
            await login(token);
            window.location.href = successUrl;
        })
        .catch(error => {
            setValue("isLoginSuccess", false);
            trigger("isLoginSuccess");

            setIsProcessing(false);
        });
    };

    return (
        <Form methods={ methods } width="350px">
            <AuthContainer>
                <GoogleOAuthContainer successUrl={ successUrl } />
                <NaverOAuthContainer successUrl={ successUrl } />
            </AuthContainer>

            <OrText>또는</OrText>

            <AuthContainer>
                <FormInput type="hidden" size="l" field={ isLoginSuccess } />

                <FormInput type="text" size="l" field={ email } />
                <FormInput type="password" size="l" field={ password } />

                <FormButton type="button" size="l"width="100%" onClick={ handleOnLogin }>
                    {
                        isProcessing ?
                            <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                            <>로그인</>
                    }
                </FormButton>

                <OptionsContainer>
                    <li>
                        <span>아직 회원이 아니신가요?</span>
                        <a href="/signup">계정생성하기</a>
                    </li>
                    <li>
                        <span>비밀번호를 잊으셨나요?</span>
                        <a href="/">비밀번호 찾기</a>
                    </li>
                </OptionsContainer>
            </AuthContainer>
        </Form>
    )
}