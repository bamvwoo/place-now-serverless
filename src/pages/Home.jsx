import { useState } from "react";
import PlaceListHeader from "../components/Home/PlaceListHeader";
import PlaceListDetail from "../components/Home/PlaceDetail";
import PlaceList from "../components/Home/PlaceList";

export default function Home({ setChatRooms }) {

    const [ selectedPlace, setSelectedPlace ] = useState(null);

    return (
        <main>
            <div>
                <PlaceListHeader />
                <PlaceList setSelectedPlace={ setSelectedPlace } setChatRooms={ setChatRooms } />
            </div>
            <PlaceListDetail selectedPlace={ selectedPlace } setChatRooms={ setChatRooms } />
        </main>
    )
}