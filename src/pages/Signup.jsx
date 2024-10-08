import { useForm } from "react-hook-form";
import { useState } from "react";
import WizardForm from "../components/Common/Form/WizardForm";
import SignupStepOne from "../components/Signup/SignupStepOne";
import SignupStepTwo from "../components/Signup/SignupStepTwo";
import SignupStepThree from "../components/Signup/SignupStepThree";
import ResultContent from "../components/Common/ResultContent";
import axios from "axios";
import SignupStepFour from "../components/Signup/SignupStepFour";

export default function Signup() {
    const methods = useForm({ reValidateMode: "onBlur" });

    const [ step, setStep ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);

    const onValid = async (data) => {
        setIsLoading(true);
        
        axios.post('/api/signup', data).then(response => {
            setIsLoading(false);
            setStep(4);
        });
    };

    const onInvalid = (errors) => {

    };

    return (
        <WizardForm methods={ methods } step={ step } setStep={ setStep } onValid={ onValid } onInvalid={ onInvalid } width="450px" height="100%">
            {
                step === 1 ?
                    <SignupStepOne /> :
                step === 2 ?
                    <SignupStepTwo /> :
                step === 3 && !isLoading ?
                    <SignupStepThree /> :
                step === 3 && isLoading ?
                    <ResultContent loading={ true } /> :
                step === 4 ?
                    <SignupStepFour /> :
                    null
            }
        </WizardForm>
    )
}