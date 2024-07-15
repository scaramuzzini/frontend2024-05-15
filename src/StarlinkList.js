import React, { useEffect, useState } from 'react';
import './StarlinkList.css';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


// npm install leaflet
// npm install react-leaflet

function StarlinkList() {

    const [starlinks, setStarlinks] = useState([]);

    useEffect(() => { 
        const fetchStarlinks = async () => {
            const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
                "query": {},
                "options": { limit: 100 }
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
            <MapContainer center={[0,0]} zoom={2} style={{height:'80vh', width:'100%'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {
                    starlinks
                        .filter((sat)=> sat.latitude !== null && sat.longitude !== null)
                        .map((sat) => (
                        <Marker position={[sat.latitude, sat.longitude]}>
                            <Popup>
                                {sat.spaceTrack.OBJECT_NAME}
                            </Popup>
                        </Marker>
                    ))
                }
                
            </MapContainer>
        </>
    )
}

export default StarlinkList;