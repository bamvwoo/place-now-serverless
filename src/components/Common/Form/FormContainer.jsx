import { FormProvider } from "react-hook-form";
import styled from "styled-components";

export default function FormContainer({ children, methods, onValid, onInvalid, wide }) {
    const RootContainer = styled.main`
        form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: ${ wide ? "35vw" : "20vw"};
            height: auto;
            max-height: 60vh;
            margin: auto;
            overflow: hidden;
        }

        form > div {
            width: 100%;
        }
    `;

    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <RootContainer>
                <form onSubmit={ handleSubmit(onValid, onInvalid) }>
                    { children }
                </form>
            </RootContainer>
        </FormProvider>
    );
}