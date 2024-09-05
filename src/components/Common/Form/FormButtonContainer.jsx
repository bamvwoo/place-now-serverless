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
        width: calc(50% - 5px);
        height: 40px;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        background-color: #e2e2e2;
        color: #f2f2f2;

        &[type="submit"] {
            background-color: var(--main-std-blue-color);
            margin-left: 10px;
        }
    }
`;

export default function FormButtonContainer({ children }) {
    return (
        <RootContainer>
            { children }
        </RootContainer>
    );
}