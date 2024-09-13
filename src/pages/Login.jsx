import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Form from "../components/Common/Form/Form";
import FormContents from "../components/Common/Form/FormContents";
import FormButtonContainer from "../components/Common/Form/FormButtonContainer";
import { useState } from "react";
import FormInput from "../components/Common/Form/FormInput";
import styled from "styled-components";
import GoogleOAuthContainer from "../components/Login/GoogleOAuthContainer";
import NaverOAuthContainer from "../components/Login/NaverOAuthContainer";

const AuthContainer = styled.div`
    & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: white;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: .1s ease-in-out;

        & > img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
    }

    & + div {
        margin-top: 10px;
    }
`;

const GuideTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    overflow: hidden;

    span:nth-child(2) {
        cursor: pointer;
        font-weight: 600;
    }
`;

export default function Login() {
    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues } = methods;

    const navigate = useNavigate();
    const { login } = useAuth();

    const [ isSuccess, setIsSuccess ] = useState(null);
    const [ isEmailLoginEnabled, setIsEmailLoginEnabled ] = useState(false);

    const onValid = async (data) => {
        const { email, password } = getValues();
        login(email, password)
            .then((result) => {
                window.location.href = `/auth?token=${result}`;
            })
            .catch((error) => {
                setIsSuccess(false);
            });
    };

    const onInvalid = (errors) => {
    };

    return (
        <>
            <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid }>
                <FormContents>
                    {
                        isSuccess !== null && !isSuccess && <span>로그인 정보를 확인해주세요</span>
                    }
                    <AuthContainer>
                        <GoogleOAuthContainer />
                        <NaverOAuthContainer />
                    </AuthContainer>

                    {
                        !isEmailLoginEnabled && (
                            <GuideTextContainer>
                                <span>또는</span>
                                <span onClick={ () => setIsEmailLoginEnabled(true) }>이메일 로그인하기</span>
                            </GuideTextContainer>
                        )
                    }

                    {
                        isEmailLoginEnabled && (
                            <AuthContainer>
                                <FormInput type="text" name="email" required="이메일을 입력해주세요" placeholder="이메일" />
                                <FormInput type="password" name="password" required="비밀번호를 입력해주세요" placeholder="비밀번호" />
                            </AuthContainer>
                        )
                    }
                </FormContents>

                {
                    isEmailLoginEnabled && (
                        <FormButtonContainer>
                            <button type="submit">로그인</button>
                        </FormButtonContainer>)
                }
            </Form>
        </>
    )
}