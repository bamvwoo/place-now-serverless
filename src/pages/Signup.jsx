import { useForm } from "react-hook-form";
import { useState } from "react";
import WizardForm from "../components/Common/Form/WizardForm";
import SignupStepOne from "../components/Signup/SignupStepOne";

export default function Signup() {
    const methods = useForm({ reValidateMode: "onBlur" });

    const [ step, setStep ] = useState(1);

    const onValid = async (data) => {
        
    };

    const onInvalid = (errors) => {

    };

    return (
        <WizardForm methods={ methods } step={ step } setStep={ setStep } onValid={ onValid } onInvalid={ onInvalid } width="450px" height="100%">
            { step === 1 && <SignupStepOne /> }
        </WizardForm>
    )
}