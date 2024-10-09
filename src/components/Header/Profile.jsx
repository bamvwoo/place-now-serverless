import styled from "styled-components";
import { useWindow } from "../../context/WindowContext";
import MyPage from "../MyPage/MyPage";
import CryptoJS from 'crypto-js';
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { useEffect, useMemo, useState } from "react";
import { HorizontalWrapper } from "../Common/Wrapper";

// 해시 함수를 사용하여 고유한 색상 코드 생성
const generateColorFromId = (id) => {
    const hash = CryptoJS.MD5(id).toString();
    return `#${hash.slice(0, 6)}`;
};

// 배경색의 밝기를 계산하는 함수
const getBrightness = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114);
};

// 배경색에 따라 텍스트 색상을 결정하는 함수
const getTextColor = (hexColor) => {
    return getBrightness(hexColor) > 186 ? '#000000' : '#FFFFFF';
};

const Wrapper = styled(HorizontalWrapper)`
    gap: 5px;
    cursor: pointer;
    position: relative;
    padding: 5px 7px;
    border-radius: 10px;
    transition: .2s ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);

        & > span {
            color: #fff;
        }
    }

    & > img {
        border-radius: 50%;
        margin-right: 5px;
    }

    &:has(> div) {
        padding: 5px 12px 5px 7px;
    }
`;

const DefaultProfileImage = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.$backgroundColor};
    
    & > span {
        font-size: 1.2rem;
        color: ${props => getTextColor(props.$backgroundColor)};
    }
`;

const UnreadMark = styled.div`
    position: absolute;
    top: 12px;
    right: 5px;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
`;

export default function Profile() {
    /* States */
    const [ profileImage, setProfileImage ] = useState(null);

    /* Custom Hooks  */
    const { user } = useAuth();
    const { unreadMessages } = useChat();
    const { toggleSidebar } = useWindow();

    /* Hooks */
    const backgroundColor = useMemo(() => {
        return user ? generateColorFromId(user._id) : '#000';
    }, [user._id]);

    const openMyPage = (e) => {
        e.preventDefault();
        toggleSidebar(<MyPage />);
    };

    useEffect(() => {
        if (user && user.profile) {
            const cachedImage = localStorage.getItem(`profileImage_${user._id}`);
            if (cachedImage) {
                setProfileImage(cachedImage);
            } else {
                fetch(user.profile)
                    .then(response => {
                        if (response.ok) {
                            return response.blob();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        setProfileImage(imageUrl);
                        localStorage.setItem(`profileImage_${user._id}`, imageUrl);
                    })
                    .catch(error => {
                        console.error('Failed to fetch profile image:', error);
                    });
            }
        }
    }, [user]);

    return (
        <Wrapper onClick={ openMyPage }>
            {
                user.profile
                ? <img src={ profileImage } alt="Profile" width="40" height="40" />
                : <DefaultProfileImage $backgroundColor={ backgroundColor }><span>{ user.name[0] }</span></DefaultProfileImage>
            }
            
            <span>{ user.name }</span>

            { 
                unreadMessages > 0 && 
                <UnreadMark></UnreadMark> 
            }
        </Wrapper>
    );
}