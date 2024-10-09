import { axiosInstance, useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import WizardForm from "../components/Common/Form/WizardForm";
import ResultContent from "../components/Common/ResultContent";
import RegistrationStepOne from "../components/Registration/RegistrationStepOne";
import RegistrationStepTwo from "../components/Registration/RegistrationStepTwo";
import RegistrationStepThree from "../components/Registration/RegistrationStepThree";
import RegistrationStepFour from "../components/Registration/RegistrationStepFour";

export default function Registration() {

    const methods = useForm({ reValidateMode: "onBlur" });

    const [ step, setStep ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);

    const onValid = async (data) => {
        setIsLoading(true);

        const formData = new FormData();
        for (const key in data) {
            if (key === 'images' && data[key]) {
                Array.from(data[key]).forEach(file => {
                    formData.append('images', file);
                });
            } else {
                formData.append(key, data[key]);
            }
        }

        await axiosInstance.post('/api/place', formData);

        setIsLoading(false);
        setStep(4);
    };

    return(
        <>
            {
                <WizardForm methods={ methods } step={ step } setStep={ setStep } onValid={ onValid } width="500px" height="100%">
                    { step === 1 &&  <RegistrationStepOne /> }
                    { step === 2 &&  <RegistrationStepTwo /> }
                    { step === 3 && !isLoading && <RegistrationStepThree /> }
                    { step === 3 && isLoading && <ResultContent loading={ true } /> }
                    { step === 4 && <RegistrationStepFour /> }
                </WizardForm>
            }
        </>
    )
}