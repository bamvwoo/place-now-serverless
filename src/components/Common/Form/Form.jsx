import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { VerticalWrapper } from "../Wrapper";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;
`;

export default function Form({ children, methods, onValid, onInvalid, width, height }) {
    const Form = styled.form`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: ${props => props.$width ? props.$width : 'auto'};
        height: ${props => props.$height ? props.$height : 'auto'};
        max-height: 60vh;
        margin: auto;
        overflow: hidden;
    `;

    const { handleSubmit } = methods;

    const handleOnValid = (data) => {
        onValid(data);
    }

    const handleOnInvalid = (errors) => {
        onInvalid(errors);
    }

    return (
        <FormProvider {...methods}>
            <Form $width={ width } $height={ height } onSubmit={ handleSubmit(handleOnValid, handleOnInvalid) }>
                <Wrapper>
                    { children }
                </Wrapper>
            </Form>
        </FormProvider>
    );
}