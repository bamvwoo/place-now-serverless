import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Form from "../components/Common/Form/Form";
import { useForm } from "react-hook-form";
import ResultContent from "../components/Common/ResultContent";
import EmailVerifier from "../components/Common/Form/EmailVerifier";
import { StepTitle } from "../components/Common/Form/WizardForm";

export default function Verification() {

    const methods = useForm({ reValidateMode: "onBlur" });
    const { getValues } = methods;

    const [ isSent, setIsSent ] = useState(false);

    const { refreshToken } = useAuth();

    const onValid = (data) => {
        
    };

    const onInvalid = (errors) => {

    };

    return (
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="350px" height="100%">
            {
                getValues("isVerified") ? (
                    <>
                        <ResultContent success={{ title: "이메일 인증이 완료되었어요", subTitle: "이제 장소를 등록하거나 채팅방에 참여할 수 있어요" }} loop="false" />
                    </>
                ) : (

                    <>
                        <StepTitle>
                            {
                                isSent ?
                                    <>이메일로 전송된<br />인증코드를 입력해주세요</> :
                                    <>인증코드를 받을<br />이메일 주소를 입력해주세요</>
                            }
                        </StepTitle>

                        <EmailVerifier isSent={ isSent } setIsSent={ setIsSent } onSuccess={ refreshToken } />
                    </>
                )
            }
        </Form>
    )
}