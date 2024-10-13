import styled from "styled-components";
import { HorizontalWrapper } from "../Common/Wrapper"
import GlobalSearchSuggetionList from "./GlobalSearchSuggetionList";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(HorizontalWrapper)`
    width: 25%;
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    transform: translate(-50%, -50%);
    overflow: unset;

    input {
        width: 100%;
        padding: 12px 30px 12px 12px;
        border: none;
        border-radius: 15px;
        background-color: #444;
        box-shadow: 3px 3px 0px var(--main-std-blue-color);
        font-size: 1rem;
        color: white;
        transition: .2s ease-in-out;

        &::placeholder {
            color: #d2d2d2;
            font-size: 1rem;
        }

        &.focused {
            transform: translateX(3px) translateY(3px);
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);

            & + button {
                transform: translateX(3px) translateY(3px);
            }
        }
    }

    button {
        position: absolute;
        right: 5px;
        font-size: 1rem;
        color: #fff;
        padding: 5px;
        transition: .2s ease-in-out;
    }
`;

export default function GlobalSearchInput() {

    const [ suggestions, setSuggestions ] = useState([]);
    
    const inputRef = useRef(null);
    const suggestionListRef = useRef(null);

    const getSearchSuggestions = (e) => {
        inputRef.current.classList.add('focused', e.type === "focus");

        if (e.key === "Enter") {
            search(e.target.value);
            return;
        }

        const keyword = e.target.value;
        if (keyword.length > 5) {
            setSuggestions([ "서울특별시 강남구", "서울특별시 강북구", "서울특별시 강서구", "서울특별시 강동구", "서울특별시 강북구" ]);
        } else {
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
                inputRef.current.classList.remove('focused');
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
            <input ref={ inputRef } type="text" placeholder="어느 장소에 대해 알고 싶나요?" onKeyUp={ getSearchSuggestions } onFocus={ getSearchSuggestions } ></input>

            <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>

            {
                suggestions.length > 0 &&
                    <GlobalSearchSuggetionList ref={ suggestionListRef } suggestions={ suggestions } setSuggestions={ setSuggestions } search={ search } />
            }
        </Wrapper>
    )
}