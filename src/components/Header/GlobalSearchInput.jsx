import styled from "styled-components";
import { HorizontalWrapper } from "../Common/Wrapper"
import GlobalSearchSuggetionList from "./GlobalSearchSuggetionList";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Wrapper = styled(HorizontalWrapper)`
    width: 25%;
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    transform: translate(-50%, -50%);
    overflow: unset;

    button {
        position: absolute;
        right: 5px;
        font-size: 1rem;
        color: #444;
        padding: 5px;
        transition: .2s ease-in-out;
        z-index: 2;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 30px 12px 12px;
    border: none;
    border-radius: 15px;
    background-color: #f9f9f9;
    box-shadow: 3px 3px 0px var(--main-std-blue-color);
    font-size: 1rem;
    color: #444;
    transition: .2s ease-in-out;

    &::placeholder {
        color: #c2c2c2;
        font-size: 1rem;
    }

    &:focus {
        transform: translateX(3px) translateY(3px);
        box-shadow: -3px -3px 0px var(--main-std-blue-color);
        z-index: 1;
    }

    ${props => props.$hasSuggestions && 
        `
            border-radius: 15px 15px 0 0;

            & + button {
                transform: translateX(3px) translateY(3px);
            }
        `
    };
`;

export default function GlobalSearchInput() {

    const [ suggestions, setSuggestions ] = useState([]);
    
    const inputRef = useRef(null);
    const suggestionListRef = useRef(null);

    const getSearchSuggestions = (e) => {
        if (e.type === "keyup" && e.key === "Enter") {
            search(e.target.value);
            return;
        }

        const keyword = e.target.value;
        if (keyword.length >= 3 && keyword.length % 3 === 0) {
            axios.get(`/api/place?keyword=${keyword}`)
            .then(response => {
                const names = response.data.map(item => item.name); // name 필드만 추출
                setSuggestions(names); // setSuggestions 호출
            })
            .catch(error => {
                console.error(error);
            });
        } else if (keyword.length === 0) {
            setSuggestions([]);
        }
    };

    const search = (keyword) => {
        
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !inputRef.current?.contains(event.target) &&
                !suggestionListRef.current?.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Wrapper>
            <Input ref={ inputRef } type="text" placeholder="어느 장소에 대해 알고 싶나요?" onKeyUp={ getSearchSuggestions } onFocus={ getSearchSuggestions } $hasSuggestions={ suggestions.length > 0 } ></Input>

            <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>

            {
                suggestions.length > 0 &&
                    <GlobalSearchSuggetionList ref={ suggestionListRef } inputRef={ inputRef } suggestions={ suggestions } setSuggestions={ setSuggestions } search={ search } />
            }
        </Wrapper>
    )
}