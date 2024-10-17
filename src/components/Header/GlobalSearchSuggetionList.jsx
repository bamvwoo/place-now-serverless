import styled from "styled-components";

const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 5px 5px 10px 5px;
    border: none;
    background-color: transparent;
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

export default function GlobalSearchSuggetionList({ inputRef, suggestions, setSuggestions, search }) {
    const handleOnSearch = (e) => {
        const keyword = e.target.innerText;

        if (inputRef.current) {
            inputRef.current.value = keyword;
        }

        search(keyword);
    };

    return (
        <Wrapper>
            {
                suggestions.map((suggestion, index) => (
                    <SuggetionItem key={ index } $index={ index } onClick={ handleOnSearch }>{ suggestion }</SuggetionItem>
                ))
            }
        </Wrapper>
    );
}