import React, { useEffect, useState } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import {Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Room from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./Show.css";
import {getPin, setPin} from '../service/api';


const Show=()=> {
  
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [place, setPlace] = useState([]);
  
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  useEffect(()=>{
    const getPinDetails = async()=>{
           const data = await getPin();
           setPlace(data);
    }
    getPinDetails();
},[])


  const handleMarkerClick = (id) =>{
    setCurrentPlaceId(id);
   
    
  };
  
  

  const handlePlace =(e)=>{
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
   
    setNewPlace({
      lng,
      lat
    });
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    let newPin = {
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
         await setPin (newPin);
         setNewPlace(null);
    };

  
    return (


      
        <div>
       
        <ReactMapGL mapLib={maplibregl} 
        initialViewState={{
          longitude:19.145136,
          latitude: 51.919437,
          zoom: 4}}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=oioW0B2pQ82IuArmBrc3"
        onDblClick={handlePlace} 
        >
         
         
   
   {
                place.map((p)=>( <>
               <Marker longitude={p.long} latitude={p.lat}
                  offsetLeft={-40}
                  offsetTop={-10}
                  anchor="top" >
                     <Room style={{fontSize:37, cursor: "pointer",   color:"tomato"}}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                     />
                     
                   </Marker>
                   
                   {p._id === currentPlaceId && (
                   <Popup longitude={p.long} latitude={p.lat}
                 
                   anchor="left"
                   key={p._id}
                   
                   closeButton={true}
                   closeOnClick={false}
                   onClose={() => setCurrentPlaceId(null)}
                   >
                   <div className="card">
                             <label>Place</label>
                             <h4 className="place">{p.title}</h4>
                             <label>Review</label>
                             <p className="desc">{p.desc}</p>
                             <label>Rating</label>
                             <div className="stars">
                               <StarIcon/>
                               <StarIcon/>
                               <StarIcon/>
                               <StarIcon/>
                               <StarIcon/>
                             </div>
                             <label>Information</label>
                             <span className="username">
                               Created by <b>Firoj Hossain</b>
                             </span>
                             <br/>
                             <span className="date">1 hour ago</span>
                           </div>
                 </Popup>
                   )}
                    
               </>
              
               
            ))}
            
      
    
      
    
      {newPlace && (
        <><Marker longitude={newPlace.lng} latitude={newPlace.lat}
        offsetLeft={-40}
        offsetTop={-10}
         anchor="left" >
              <Room style={{fontSize:37, cursor: "pointer"}}/>
              
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.lng}  
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
            
            </>
      )}
      
        
      </ReactMapGL>                 
        </div>
    )
}

export default Show;


