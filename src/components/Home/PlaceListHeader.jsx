import styled, { keyframes } from "styled-components";
import { BasicButton } from "../Common/Button/BasicButton";
import { HorizontalWrapper } from "../Common/Wrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const rotateAnimation = keyframes`
    30% {
        transform: translateY(-2px);
    }
    70% {
        transform: translateY(1px) rotate(10deg);
    }
    90% {
        transform: translateY(0px) rotate(-5deg);
    }
    100% {
        transform: translateY(0);
    }
`;

const Wrapper = styled(HorizontalWrapper)`
    width: 100%;
    height: 70px;
    justify-content: flex-start;
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 0;

    & > button {
        gap: 5px;
    }

    & > button:hover {
        & > i {
            animation: ${rotateAnimation} .5s ease-in-out 1;
            transform-origin: bottom;
        }
    }
`;

export default function PlaceListHeader() {

    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Wrapper>
            {
                user && (
                    <BasicButton $solid={ true } onClick={ () => navigate('/registration') }><i className="fa-solid fa-location-dot"></i> 장소 추가</BasicButton>
                )
            }
        </Wrapper>
    )
}