import { FormProvider } from "react-hook-form";
import styled from "styled-components";

export default function FormContainer({ children, methods, onValid, onInvalid, wide }) {
    const RootContainer = styled.main`
        form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: ${ wide ? "500px" : "300px"};
            height: auto;
            max-height: 60vh;
            margin: auto;
            overflow: hidden;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        form > div {
            width: 100%;
        }
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
            <RootContainer>
                <form onSubmit={ handleSubmit(handleOnValid, handleOnInvalid) }>
                    { children }
                </form>
            </RootContainer>
        </FormProvider>
    );
}