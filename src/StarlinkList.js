import React, { useEffect, useState } from 'react';
import './StarlinkList.css';
import axios from 'axios';

function olaMundo() {
}

function StarlinkList() {

    const [starlinks, setStarlinks] = useState([]);

    useEffect(() => { 
        const fetchStarlinks = async () => {
            const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
                "query": {},
                "options": { limit: 10 }
            });
            console.log(response.data);
            setStarlinks(response.data.docs);
        }
        fetchStarlinks();
    },[]);
    


    //Meu componente starlink
    return (
        <>
            <h1>Satélites Starlink</h1>
            <ul>
                {
                    starlinks.map((sat) => (
                        <li key={sat.id}> {sat.spaceTrack.OBJECT_NAME} </li>
                    ))
                }
            </ul>
        </>
    )
}

export default StarlinkList;