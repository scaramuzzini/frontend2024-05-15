import React, { useEffect } from 'react';
import './StarlinkList.css';
import axios from 'axios';

function olaMundo() {
}

function StarlinkList() {

    useEffect(() => { 
        const fetchStarlinks = async () => {
            const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
                "query": {},
                "options": { limit: 10 }
            });
            console.log(response);
        }
        fetchStarlinks();
    },[]);
    


    //Meu componente starlink
    return (
        <>
            <h1>Satélites Starlink</h1>
        </>
    )
}

export default StarlinkList;