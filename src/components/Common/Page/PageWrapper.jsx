import { Children, cloneElement, isValidElement, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
    display: flex;
    width: 100%;
    height: calc(100% - var(--global-header-height));
    padding: 0 var(--global-padding);

    $:has(> aside) {
        flex-direction: row;
    }

    $:not(:has(> aside)) {
        flex-direction: column;
    }

    & > aside {
        width: 30%;
        height: 100%;
    }
    
    & > section {
        width: 100%;
        height: 100%;
    }

    & > aside + section {
        width: 70%;
        height: 100%;
    }
`;

const PageContentWrapper = styled.section`
    
`;

export default function PageWrapper({ children }) {
    return (
        <Wrapper>
            { children }
        </Wrapper>
    )
}