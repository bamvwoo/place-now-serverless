import PlaceListHeader from "../components/Home/PlaceListHeader";
import PlaceList from "../components/Home/PlaceList";
import styled from "styled-components";
import { VerticalWrapper } from "../components/Common/Wrapper";

const Wrapper = styled(VerticalWrapper)`
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 20px;
    gap: 20px;
`;

export default function Home() {
    return (
        <>
            <Wrapper>
                <PlaceListHeader />
                <PlaceList />
            </Wrapper>
        </>
    )
}