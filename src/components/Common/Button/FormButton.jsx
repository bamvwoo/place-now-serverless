import styled, { keyframes } from "styled-components";
import { BasicButton } from "./BasicButton";

const nextAnimation = keyframes`
    30% {
        transform: scale(0.8)
    }

    50% {
        transform: translateX(3px) scale(0.9)
    }

    70% {
        transform: translateX(-2px) scale(1)
    }

    100% {
        transform: scale(1)
    }
`;

const Button = styled(BasicButton)`
    gap: 10px;

    &:hover {
        & > i {
            animation: ${nextAnimation} 0.8s ease-out;
        }
    }
`;

export default function FormButton({ type, text, complete, onClick }) {
    type = type || "button";
    text = text || (type === "submit" ? complete ? "제출" : "다음" : "이전");

    return (
        <Button type={ type } $size="l" $solid={ type === "submit" } onClick={ onClick }>
            { text }
            { 
                type === "submit" && !complete && <i className="fa-solid fa-chevron-right"></i>
            }
        </Button>
    )
}