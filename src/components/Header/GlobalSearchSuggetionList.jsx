import { forwardRef } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    width: 100%;
    top: calc(100% - 3px);
    left: 3px;
    padding: 5px 5px 10px 5px;
    border: none;
    border-radius: 0 0 15px 15px;
    box-shadow: -3px -1px 0px var(--main-std-blue-color);
    background-color: #f9f9f9;
    animation: fadeIn .2s ease-in-out;
`;

const SuggetionItem = styled.li`
    cursor: pointer;
    animation: fadeIn ${props => (props.$index * 0.2) + "s"} ease-in-out;
    border-radius: 10px;
    padding: 10px;

    &:hover {
        background-color: #e9e9e9;
    }
`;

const GlobalSearchSuggetionList = forwardRef(({ inputRef, suggestions, setSuggestions, search }, ref) => {

    const handleOnSearch = (e) => {
        const keyword = e.target.innerText;

        if (inputRef.current) {
            inputRef.current.value = keyword;
        }

        search(keyword);
    };

    return (
        <Wrapper ref={ref}>
            {
                suggestions.map((suggestion, index) => (
                    <SuggetionItem key={ index } $index={ index } onClick={ handleOnSearch }>{ suggestion }</SuggetionItem>
                ))
            }
        </Wrapper>
    )
});

GlobalSearchSuggetionList.displayName = 'GlobalSearchSuggetionList';

export default GlobalSearchSuggetionList;