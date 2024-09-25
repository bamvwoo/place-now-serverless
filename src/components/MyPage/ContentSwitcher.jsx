import { useEffect, useRef } from "react";
import styled from "styled-components";

const TitleTab = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
    gap: 5px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.3);

    & > li {
        font-size: 1.3rem;
        cursor: pointer;
        transition: .2s ease-in-out;
    }

    & > li:hover {
        color: #444;
    }

    & > li.active {
        font-size: 1.5rem;
        color: #444;
    }
`;

export default function ContentSwitcher({ contents, activeContent, setActiveContent }) {

    const activeContentRef = useRef(null);

    const switchContent = (e) => {
        let index = 0;
        if (e) {
            index = e.target.dataset.index;
        }

        setActiveContent(contents[index].content);
    };

    return (
        <TitleTab>
            { 
                contents.map((content, index) => {
                    return <li key={ index } data-index={ index } onClick={ switchContent }><h1>{ content.title }</h1></li>
                })
            }
        </TitleTab>
    );
}