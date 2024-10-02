import styled, { keyframes } from "styled-components";
import { BasicButton } from "./BasicButton";

const arrowAnimation = keyframes`
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

    & > i {
        font-size: ${props =>
            props.$size && props.$size === "s" ?
                "0.6rem" :
            props.$size && props.$size === "m" ?
                "0.8rem" :
            props.$size && props.$size === "l" ?
                "1rem" :
                "0.8rem"
        };
    }

    &:hover {
        & > i {
            animation: ${arrowAnimation} 0.8s ease-out;
        }
    }
`;

export default function FormButton({ type, direction, text, icon, onClick }) {
    type = type || "button";
    direction = direction || "next";
    text = text || (direction === "next" ? "다음" : "이전");
    icon = icon !== undefined ? icon : true;

    return (
        <Button type={ type } $size="l" $solid={ direction === "next" } onClick={ onClick }>
            {
                (icon && direction === "prev") && 
                    <i className="fa-solid fa-chevron-left"></i>
            }
            
            { text }

            { 
                (icon && direction === "next") && 
                    <i className="fa-solid fa-chevron-right"></i>
            }
        </Button>
    )
}