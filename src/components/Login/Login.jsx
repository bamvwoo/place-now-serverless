import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Form from "../Common/Form/Form";
import { useState } from "react";
import FormInput from "../Common/Form/FormInput";
import GoogleOAuthContainer from "./GoogleOAuthContainer";
import NaverOAuthContainer from "./NaverOAuthContainer";
import axios from "axios";
import { VerticalWrapper } from "../Common/Wrapper";
import useGetLoginForm from "../../hooks/useGetLoginForm";

const LoginButton = styled.button`
    width: 100%;
    border: 1px solid #444;
    border-radius: 5px;
    padding: 10px 20px;
    transition: .2s ease-in-out;
    font-size: 1rem;
    color: #444;
    margin-top: 5px;

    &:hover {
        background-color: #444;
        color: white;
    }
`;

const OrText = styled.p`
    text-align: center;
    margin: 20px 0;
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

export default function Login() {
    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues } = methods;

    const navigate = useNavigate();
    const { login } = useAuth();

    const { email, password } = useGetLoginForm();

    const [ isSuccess, setIsSuccess ] = useState(null);

    const onValid = async (data) => {
        const { email, password } = getValues();

        setIsSuccess(null);

        try {
            const response = await axios.post("/api/auth", { email, password });
            const token = response.data;

            await login(token);

            window.location.href = "/";
        } catch (error) {
            setIsSuccess(false);
        }
    };

    const onInvalid = (errors) => {
    };

    return (
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="300px">
            <AuthContainer>
                <GoogleOAuthContainer />
                <NaverOAuthContainer />
            </AuthContainer>

            <OrText>또는</OrText>

            {
                isSuccess !== null && !isSuccess && <InvalidText>로그인 정보를 확인해주세요</InvalidText>
            }
            <AuthContainer>
                <FormInput type="text" field={ email } placeholder="이메일" />
                <FormInput type="password" field={ password } placeholder="비밀번호" />

                <LoginButton type="submit">로그인</LoginButton>

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