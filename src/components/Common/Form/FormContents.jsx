import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    
    & > div {
        width: 100%;
    }

    input::placeholder {
        color: #d2d2d2;
    }

    input:not([type^=hidden]):not([type^=checkbox]), select {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        font-weight: 400;
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;
        font-size: 1rem;
        transition: .1s ease-in-out;
    }

    input:not([type^=hidden]):not([type^=checkbox]):focus, select:focus {
        border: 1px solid var(--main-std-dark-bg-color);
    }

    input:not([type^=hidden]):not([type^=checkbox]).form-is-invalid, select.form-is-invalid {
        border: 1px solid red;
    }

    h4 {
        margin-bottom: 15px;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

export default function FormContents({ children }) {
    return (
        <RootContainer>
            { children }
        </RootContainer>
    );
}