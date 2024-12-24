import type {Place} from "../api/Place";
import {Fragment, useState} from "react";
import {search} from "../api/search";

//Prop to be expected contains a function
interface LocationSearchProps {
    onPlaceClick: (place:Place) => void;
}

export default function LocationSearch({onPlaceClick}:LocationSearchProps) {
    const [places, setPlaces] = useState<Place[]>([]) //must declare array is Place type
    const [term, setTerm] = useState('');

    //handles submission of search form
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //results holds array of Place objects from search component/function
        const results = await search(term);

        //sets places to array of Place objects
        setPlaces(results);
    }//END handleSubmit


    return <div>
       <form onSubmit={handleSubmit}>
           <label className="font-bold" htmlFor="term">
               Search
           </label>
           <input className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
           id="term"
           value={term}
           onChange={e => setTerm(e.target.value)}/>
       </form>
        <h1 className="font-bold mt-6">Found Locations</h1>
        <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
            {
                //Creates a section in search results part of page for each Place object found in array
                places.map(place => {
                    return <Fragment key={place.id}>
                        <p className="text-sm">{place.name}</p>
                        <button className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded" onClick={() => onPlaceClick(place)}>
                            Go!
                        </button>
                        <div className="border-b w-full col-span-2"/>
                    </Fragment>
                })
            }
        </div>
    </div>
}