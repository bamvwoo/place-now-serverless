import { useState, useEffect } from "react";
import axios from 'axios';

export default function PlaceList({ setSelectedPlace }) {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/api/place')
        .then(response => {
            console.log(response.data);
            setPlaces(response.data);
        });
    }, []);

    const handleSetSelectedPlace = (place) => {
        setSelectedPlace(place);
    }

    return (
        <div>
            <ul>
                {
                    places.length > 0 ? (
                        places.map(place => (
                            <li key={place._id} onClick={ () => handleSetSelectedPlace(place) }>
                                <h2>{place.name}</h2>
                                <p>{place.description}</p>
                            </li>
                        ))
                    ) : (
                        <li>Loading...</li>
                    )
                }
            </ul>
        </div>
    )
}