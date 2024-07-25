import type {Place} from "./api/Place"; //type says to import a data type form somewhere
import {useState} from "react";
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";



function App() {
 //place to be sent into Map component can be Place or null
 //setPlace passed into location search as component
 const [place, setPlace] = useState<Place | null>(null);

 return <div className="h-screen w-screen grid grid-cols-12">
  <div className="col-span-3 p-2">
   <LocationSearch onPlaceClick={(p) => setPlace(p)}/>
  </div>
  <div className="col-span-9">
   <Map place={place}/>
  </div>
 </div>
}

export default App
