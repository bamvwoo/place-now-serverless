import styled from "styled-components";
import { VerticalWrapper } from "../Common/Wrapper"
import GlobalSearchSuggetionList from "./GlobalSearchSuggetionList";
import { useEffect, useRef, useState } from "react";
import GlobalSearchInput from "./GlobalSearchInput";

const Wrapper = styled(VerticalWrapper)`
    width: 25%;
    padding: 10px;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    background-color: #f9f9f9;
    box-shadow: 3px 3px 0px var(--main-std-blue-color);
    transition: .2s ease-in-out;

    &.focused {
        top: calc(25% + 3px);
        left: calc(50% + 3px);
        box-shadow: -3px -3px 0px var(--main-std-blue-color);
    }

    button {
        position: absolute;
        top: 7.5px;
        right: 5px;
        font-size: 1rem;
        color: #444;
        padding: 5px;
        transition: .2s ease-in-out;
        z-index: 2;
    }
`;

export default function GlobalSearch() {

    const [ keyword, setKeyword ] = useState('agasefess');
    const [ suggestions, setSuggestions ] = useState([]);
    
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    const search = () => {
        
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current?.contains(event.target)) {
                wrapperRef.current.classList.add('focused');
            } else {
                wrapperRef.current?.classList.remove('focused');
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Wrapper ref={ wrapperRef }>
            <GlobalSearchInput ref={ inputRef } keywod={ keyword } setKeyword={ setKeyword } setSuggestions={ setSuggestions } />

            <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>

            {
                suggestions.length > 0 &&
                    <GlobalSearchSuggetionList inputRef={ inputRef } suggestions={ suggestions } setSuggestions={ setSuggestions } search={ search } />
            }
        </Wrapper>
    )
}