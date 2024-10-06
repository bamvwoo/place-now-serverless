import Lottie from "lottie-react";
import styled from "styled-components";
import SuccessAnimation from "../../assets/lottie/animation-completed.json";
import LoadingAnimation from "../../assets/lottie/animation-loading.json";
import FailAnimation from "../../assets/lottie/animation-error.json";
import { useEffect, useState } from "react";
import { VerticalWrapper } from "./Wrapper";

const RootContainer = styled(VerticalWrapper)`
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
                        success ? JSON.parse(JSON.stringify(SuccessAnimation)) : 
                        loading ? JSON.parse(JSON.stringify(LoadingAnimation)) : 
                        fail ? JSON.parse(JSON.stringify(FailAnimation)) : null
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