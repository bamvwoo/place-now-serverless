import Lottie from "lottie-react";
import styled from "styled-components";
import SuccessAnimation from "../../assets/lottie/animation-completed.json";
import LoadingAnimation from "../../assets/lottie/animation-loading.json";
import FailAnimation from "../../assets/lottie/animation-error.json";
import { useEffect, useState } from "react";

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;

    h4 {
        margin-bottom: 15px;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

const LottieContainer = styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
`;

export default function ResultContent({ success, loading, fail, loop }) {

    loop = loop || true;

    const [ title, setTitle ] = useState(null);
    const [ subTitle, setSubTitle ] = useState(null);

    useEffect(() => {
        const result = success || loading || fail;

        setTitle(result.title ? result.title : null);
        setSubTitle(result.subTitle ? result.subTitle : null);
    }, [title, subTitle, success, loading, fail]);

    return (
        <RootContainer>
            <LottieContainer>
                <Lottie 
                    animationData={
                        success ? SuccessAnimation : 
                        loading ? LoadingAnimation : 
                        fail ? FailAnimation : null
                    } loop={ loop } />
            </LottieContainer>

            {
                title && <h4>{ title }</h4>
            }
            {
                subTitle && <h5>{ subTitle }</h5>
            }
        </RootContainer>
    )
}