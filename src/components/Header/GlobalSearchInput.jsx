import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 1rem;
    color: #444;
    transition: .2s ease-in-out;
    background-color: transparent;

    &::placeholder {
        color: #c2c2c2;
        font-size: 1rem;
    }
`;

const GlobalSearchInput = forwardRef(({ keyword, setKeyword, setSuggestions }, ref) => {

    const handleOnChange = (e) => {
        const value = e.target.value?.trim();
        if (value.length > 2) {
            setKeyword(e.target.value);
        }
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`/api/place?keyword=${keyword}`);
                const names = response.data.map(item => item.name); // name 필드만 추출
                setSuggestions(names); // setSuggestions 호출
            } catch (error) {
                console.error('Failed to fetch suggestions', error);
            }
        };
    }, [ keyword ]);

    return (
        <Input ref={ ref } placeholder="어느 장소에 대해 알고싶나요?" onChange={ handleOnChange } value={ keyword } />
    );
});

GlobalSearchInput.displayName = 'GlobalSearchInput';

export default GlobalSearchInput;