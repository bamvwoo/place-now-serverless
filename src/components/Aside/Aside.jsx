import { useState } from "react";
import PlaceList from "./PlaceList";
import ChatRoom from "./ChatRoom";
import styles from "./styles/Aside.module.css";
import AsideHeader from "./AsideHeader";

export default function Aside() {
    const [ selectedPlace, setSelectedPlace ] = useState(null);

    return (
        <aside className={ `${styles["aside"]}` }>
            <AsideHeader />
            <div className={ `${styles["content-wrapper"]}` }>
                <PlaceList setSelectedPlace={ setSelectedPlace } />
                {
                    selectedPlace ? (
                        <ChatRoom place={ selectedPlace } />
                    ) : 
                    null
                }
            </div>
        </aside>
    )
}