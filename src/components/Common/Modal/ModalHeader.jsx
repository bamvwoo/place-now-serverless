import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    border-radius: 20px 20px 0 0;
    padding: 20px 10px;
    border: none;

    & > span {
        font-size: 0.8rem;
    }

    & > button {
        font-size: 1.5rem;
        color: #00C1A2;
    }
`;

export default function ModalHeader({ title, closeText, handleClose }) {

    const handleMouseEnter = (e) => {
        e.target.classList.remove('fa-regular');
        e.target.classList.add('fa-solid');
    };

    const handleMouseLeave = (e) => {
        e.target.classList.remove('fa-solid');
        e.target.classList.add('fa-regular');
    };

    return (
        <Wrapper>
            <span>{ title }</span>
            <button type="button" onClick={ handleClose }>
                {
                    closeText || <i className="fa-regular fa-circle-xmark" onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave } ></i>
                }
            </button>
        </Wrapper>
    )
}