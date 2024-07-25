import type {Place} from "../api/Place";

//expect the component to receive either null (on load) or Place obj
interface MapProps {
    place:Place | null;
}

export default function Map({place}:MapProps){
    return <div>Map!</div>
}