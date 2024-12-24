import type {Place} from "../api/Place";
import 'leaflet/dist/leaflet.css';
import type {Map as LeafletMap} from 'leaflet';
import {useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker} from "react-leaflet";

//expect the component to receive either null (on load) or Place obj
interface MapProps {
    place:Place | null;
}

//takes in a place variable formatted like MaoProps
export default function Map({place}:MapProps){
    const mapRef = useRef<LeafletMap | null>(null);

    //useEffect runs anonymous function whenever place changes
    useEffect(()=> {
        if (mapRef.current && place){
            mapRef.current.flyTo([place.latitude, place.longitude]);
        }
    }, [place])


    return <MapContainer ref={mapRef} center={[40.7, -74]} zoom={12} scrollWheelZoom className="h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {//if place is valid, puts marker on location
            place && <Marker position={[place.latitude, place.longitude]} />
        }
    </MapContainer>
}