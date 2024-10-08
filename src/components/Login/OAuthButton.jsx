import styled from "styled-components";

export default function OAuthButton({ color, children, onClick }) {
    const OAuthButton = styled.button`
        --main-color: ${color ? color : '#444'};

        color: var(--main-color);
        border: 1px solid var(--main-color);

        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        transition: .2s ease-in-out;
        overflow: hidden;
        white-space: nowrap;

        &:hover {
            background-color: var(--main-color);
            color: white;
        }

        & > img {
            width: 20px;
            height: 20px;
        }

        & > span {
            font-size: 1rem;
            margin-left: 5px;
        }
    `;

    const handleOnClick = (e) => {
        onClick();
    }

    return (
        <OAuthButton type="button" onClick={ handleOnClick }>
            { children }
        </OAuthButton>
    );
}