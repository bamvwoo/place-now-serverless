import { useForm } from "react-hook-form";
import Form from "../Common/Form/Form";
import { useState } from "react";
import styled from "styled-components";
import WizardStepOne from "./WizardSteps/WizardStepOne";
import { HorizontalWrapper, VerticalWrapper } from "../Common/Wrapper";
import WizardStepThree from "./WizardSteps/WizardStepThree";

const StepWrapper = styled(VerticalWrapper)`
    width: 100%;
    flex: 1;
    justify-content: flex-start;
    gap: 15px;
`;

export const StepTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 20px;
    line-height: 1.5;
`;

export const StepButtonWrapper = styled(HorizontalWrapper)`
    width: 100%;
    margin-top: auto;
    padding-bottom: 10px;
    gap: 10px;
    flex-self: flex-end;
    justify-content: flex-end;

    & > button {
        width: 50%;
    }
`;

export default function WizardForm() {
    const methods = useForm({ reValidateMode: "onBlur" });

    const [ step, setStep ] = useState(1);

    const onValid = (data) => {

    };

    const onInvalid = (errors) => {

    };

    return (
        <Form methods={ methods } onValid={ onValid } onInvalid={ onInvalid } width="400px" height="100%">
            <StepWrapper>
                { step === 1 &&  <WizardStepOne setStep={ setStep } /> }
                { step === 3 &&  <WizardStepThree setStep={ setStep } /> }
            </StepWrapper>
        </Form>
    )  
}