import { forwardRef } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    width: 100%;
    top: calc(100% + 10px);
    left: 3px;
    padding: 5px;
    border-radius: 15px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`;

const SuggetionItem = styled.li`
    cursor: pointer;
    animation: fadeIn ${props => (props.$index * 0.3) + "s"} ease-in-out;
    border-radius: 10px;
    padding: 10px;

    &:hover {
        background-color: #f9f9f9;
    }
`;

const GlobalSearchSuggetionList = forwardRef(({ suggestions, setSuggestions, search }, ref) => {

    const handleOnSearch = (e) => {
        const keyword = e.target.innerText;
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