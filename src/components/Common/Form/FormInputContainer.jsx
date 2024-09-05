import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    
    & > div {
        width: 100%;
    }

    input[type=text], input[type=password], input[type=email], select {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    h4 {
        margin-bottom: 15px;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

export default function FormInputContainer({ children }) {
    return (
        <RootContainer>
            <div>
                { children }
            </div>
        </RootContainer>
    );
}