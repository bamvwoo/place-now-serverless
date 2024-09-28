import { createPortal } from "react-dom";
import styled from "styled-components";

const ContentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;

export default function Tooltip({ content }) {
    return (
        <>
            <i className="fa-solid fa-circle-question"></i>
            {
                createPortal(
                    <ContentWrapper><span>{ content }</span></ContentWrapper>,
                    document.body
                )
            }
            
        </>
    )
}