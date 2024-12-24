import type {Place} from "./Place";

//destructuring specific properties wanted from data object
interface SearchResponse {
    features:{
        geometry:{
            coordinates:number[]
        },
        properties:{
            place_id:number;
            display_name:string;
        }
    }[]
}

//takes in a string searchTerm
export const search = async (term:string) => {
    //saves response from API using searchTerm
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );

    //saves response in the form of SearchResponse interface using response data parsed into json format
    const data: SearchResponse = await res.json();


    //format data into array of Place objects from interface
    //for each feature, create a Place object and store into places array
    const places:Place[] = data.features.map((feature) => {
        return {
            id:feature.properties.place_id,
            name:feature.properties.display_name,
            longitude:feature.geometry.coordinates[0],
            latitude:feature.geometry.coordinates[1]
        }
    });

    //returns array of Place objects
    //Sent into LocationSearch component
    return places;
}