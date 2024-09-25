import { useEffect, useRef } from "react";
import styled from "styled-components";

const TabList = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
    gap: 10px;
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
        font-size: 1.8rem;
        color: #444;
    }
`;

export default function ContentSwitcher({ contents, activeContent, setActiveContent }) {

    const tabListRef = useRef(null);
    const activeTabRef = useRef(null);

    const switchContent = (e, i) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget === activeTabRef.current) return;

        activeTabRef.current.classList.remove("active");

        activeTabRef.current = e.currentTarget;
        activeTabRef.current.classList.add("active");

        setActiveContent(contents[i]);
    };

    useEffect(() => {
        if (tabListRef.current) {
            activeTabRef.current = tabListRef.current.querySelector("li:nth-child(1)");
            if (activeTabRef.current) {
                activeTabRef.current.classList.add("active");
            }
        }
    }, []);

    return (
        <TabList ref={ tabListRef }>
            { 
                contents.map((content, index) => {
                    return <li key={ index } onClick={ (e) => switchContent(e, index) }><h1>{ content.title }</h1></li>
                })
            }
        </TabList>
    );
}