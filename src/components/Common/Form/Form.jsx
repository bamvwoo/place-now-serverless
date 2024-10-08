import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { VerticalWrapper } from "../Wrapper";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;

    & > *:not(:has(> input[type="hidden"])):not(:last-child) {
        margin-bottom: 10px;
    }

    & > *:has(> input[type="hidden"]):has(> p):not(:last-child) {
        margin-bottom: 10px;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 700;
        align-self: flex-start;
        margin-bottom: 20px;
        line-height: 1.5;
    }
`;

const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.$width ? props.$width : 'auto'};
    height: ${props => props.$height ? props.$height : 'auto'};
    max-height: 70vh;
    margin: auto;
    overflow: hidden;
`;

export default function Form({ children, methods, onValid, onInvalid, width, height }) {
    const { handleSubmit } = methods;

    const handleOnValid = (data) => {
        onValid(data);
    }

    const handleOnInvalid = (errors) => {
        onInvalid(errors);
    }

    return (
        <FormProvider {...methods}>
            <CustomForm $width={ width } $height={ height } 
                onSubmit={ handleSubmit(handleOnValid, handleOnInvalid) }
                onKeyDown={ e => e.key === "Enter" && e.preventDefault() }>
                <Wrapper>
                    { children }
                </Wrapper>
            </CustomForm>
        </FormProvider>
    );
}