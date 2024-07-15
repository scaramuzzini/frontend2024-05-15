import React, { useEffect, useState } from 'react';
import './StarlinkList.css';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const satIcon = new L.icon({
    iconUrl: 'satellite.png',
    iconSize:[25,25],
});

// npm install leaflet
// npm install react-leaflet

function StarlinkList() {
    const [starlinks, setStarlinks] = useState([]);
    const [page,setPage] = useState(1);

    const carregarProxima = () => {
        const proximaPagina = page + 1;
        setPage(proximaPagina);
        fetchStarlinks(proximaPagina);
    };

    const fetchStarlinks = async (page) => {
        const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
            "query": {},
            "options": { page: page, limit: 100 }
        });
        console.log(response.data);
        //setStarlinks(response.data.docs);
        setStarlinks((docsAtuais) => [...docsAtuais, ...response.data.docs]);
    };




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
                        <Marker position={[sat.latitude, sat.longitude]} icon={satIcon}>
                            <Popup>
                                {sat.spaceTrack.OBJECT_NAME}
                            </Popup>
                        </Marker>
                    ))
                }
                
            </MapContainer>
            <h4>{page}</h4>
            <button onClick={carregarProxima}>Carregar mais</button>
        </>
    )
}

export default StarlinkList;