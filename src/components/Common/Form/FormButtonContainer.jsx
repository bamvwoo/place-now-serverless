import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40px;
    
    &[has:button[type="button"]] {
        justify-content: space-between;
    }

    button {
        flex: 1;
        height: 40px;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        background-color: transparent;
        transition: .1s ease-in-out;

        &[type="submit"] {
            color: var(--main-std-blue-color);
            border: 1px solid var(--main-std-blue-color);
        }

        &[type="submit"]:hover {
            color: var(--main-std-light-font-color);
            background-color: var(--main-std-blue-color);
        }
    }

    button + button {
        margin-left: 10px;
    }
`;

export default function FormButtonContainer({ children }) {
    return (
        <RootContainer>
            { children }
        </RootContainer>
    );
}