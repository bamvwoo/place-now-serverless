import { FormProvider } from "react-hook-form";
import styled from "styled-components";

export default function Form({ children, methods, onValid, onInvalid, wide }) {
    const Wrapper = styled.div`
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
            <Wrapper>
                <form onSubmit={ handleSubmit(handleOnValid, handleOnInvalid) }>
                    { children }
                </form>
            </Wrapper>
        </FormProvider>
    );
}