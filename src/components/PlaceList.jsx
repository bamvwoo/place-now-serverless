import { useState, useEffect } from "react";
import axios from 'axios';

export default function PlaceList() {

    const [places, setPlaces] = useState([]);
        
    useEffect(() => {
        axios.get('/api/place')
        .then(response => {
            console.log(response.data);
            setPlaces(response.data);
        });
    }, []);

    return (
        <>
            <ul>
                {
                    places.length > 0 ? (
                        places.map(place => (
                            <li key={place._id}>
                                <h2>{place.name}</h2>
                                <p>{place.description}</p>
                            </li>
                        ))
                    ) : (
                        <li>Loading...</li>
                    )
                }
            </ul>
        </>
    )
}