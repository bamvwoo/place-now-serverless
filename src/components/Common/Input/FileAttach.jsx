import styled from "styled-components";
import { VerticalWrapper } from "../Wrapper";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    gap: 5px;
`;

const AttachArea = styled(VerticalWrapper)`
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;

    padding: ${props =>
        props.$size && props.$size === "s" ?
            "10px" :
        props.$size && props.$size === "m" ?
            "15px" :
        props.$size && props.$size === "l" ?
            "20px" :
            "15px"
    };

    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };

    &:hover {
        background-color: #e5e5e5;
    }
`;

const AttachmentWrapper = styled.div`
    width: 100%;
    position: relative;
`;

const AttachmentList = styled.ul`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    flex-wrap: nowrap;
    overflow: hidden;

    & > li {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 200px;
        flex-shrink: 0;
        overflow: hidden;
        padding: 10px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #f5f5f5;
        border-radius: 5px;
        cursor: pointer;
        position: relative;

        &:hover {
            &::after {
                display: flex;
                justify-content: center;
                align-items: center;
                content: "삭제";
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #e5e5e5;
            }
        }
    }
`;

const AttachmentButton = styled.button`
    position: absolute;
    top: 0px;
    z-index: 1;
    padding: 10px;

    font-size: ${props =>
        props.$size && props.$size === "s" ?
            "0.8rem" :
        props.$size && props.$size === "m" ?
            "1rem" :
        props.$size && props.$size === "l" ?
            "1.2rem" :
            "1rem"
    };

    opacity: 0.3;
    transition: .2s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;

const PrevAttachmentButton = styled(AttachmentButton)`
    left: 0px;
`;

const NextAttachmentButton = styled(AttachmentButton)`
    right: 0px;
`;

export default function FileAttach({ fileInputRef, attachments, onAttachmentRemove, size}) {

    const [ currentAttachmentIndex, setCurrentAttachmentIndex ] = useState(0);
    const [ isLeftOverflow, setIsLeftOverflow ] = useState(false);
    const [ isRightOverflow, setIsRightOverflow ] = useState(false);

    const attachmentListRef = useRef(null);

    const handleOnClick = (e) => {
        e.preventDefault();

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleOnPrevButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentAttachmentIndex > 0) {
            setCurrentAttachmentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleOnNextButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentAttachmentIndex < attachments.length - 1) {
            setCurrentAttachmentIndex((prevIndex) => prevIndex + 1);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const list = attachmentListRef.current;

            const firstChild = list.firstElementChild;
            const lastChild = list.lastElementChild;

            if (firstChild) {
                setIsLeftOverflow(firstChild.getBoundingClientRect().left < list.getBoundingClientRect().left);
            }

            if (lastChild) {
                setIsRightOverflow(lastChild.getBoundingClientRect().right > list.getBoundingClientRect().right);
            }
        };
        
        if (attachmentListRef.current) {
            handleScroll();

            attachmentListRef.current.addEventListener("scroll", handleScroll);

            const currentAttachment = attachmentListRef.current.children[currentAttachmentIndex];
            if (currentAttachment) {
                attachmentListRef.current.scrollTo({
                    left: currentAttachment.offsetLeft,
                    behavior: "smooth"
                });
            }
        }

        return () => {
            if (attachmentListRef.current) {
                attachmentListRef.current.removeEventListener("scroll", handleScroll);
            }
        }
    }, [ attachments, currentAttachmentIndex ]);

    return (
        <Wrapper>
            <AttachArea $size={ size } onClick={ handleOnClick }>
                <p>여기를 클릭하여 사진 첨부하기</p>
            </AttachArea>

            {
                attachments?.length > 0 &&
                <AttachmentWrapper>
                    {
                        isLeftOverflow &&
                        <PrevAttachmentButton type="button" onClick={ handleOnPrevButtonClick } $size={ size }><i className="fa-solid fa-circle-chevron-left"></i></PrevAttachmentButton>
                    }

                    <AttachmentList ref={ attachmentListRef }>
                        {
                            attachments?.map((attachment, index) => {
                                return (
                                    <li key={ index } onClick={ (e) => onAttachmentRemove(e, index) }><i className="fa-regular fa-file-image"></i> { attachment.name }</li>
                                )
                            })
                        }
                    </AttachmentList>

                    {
                        isRightOverflow &&
                        <NextAttachmentButton type="button" onClick={ handleOnNextButtonClick } $size={ size }><i className="fa-solid fa-circle-chevron-right"></i></NextAttachmentButton>
                    }
                </AttachmentWrapper>
            }
        </Wrapper>
    )
}