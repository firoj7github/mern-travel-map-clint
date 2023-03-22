import React, { useEffect, useState } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import {Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./Show.css";
import { getPin, setPin} from '../service/api';


const Show=()=> {

  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [sets, setPins] = useState();
  const [currentPlaceId, setCurrentPlaceId] = useState(null);


  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    
  };
  
  useEffect(()=>{
    const getPinDetails = async()=>{
           let data = await getPin();
           console.log(data);
           setPins(data);
    }
    getPinDetails();
},[])

  const handlePlace =(e)=>{
    console.log(e);
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    console.log(lng);
    setNewPlace({
      lng,
      lat
    });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPin = {
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
         await setPin (newPin);
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
        onClick={handlePlace} 
        >
   
   {  sets.map(pin => (
    <>
   <Marker longitude={pin.long} latitude={pin.lat}
   offsetLeft={-40}
   offsetTop={-10}
   anchor="top" >
      <RoomIcon style={{fontSize:50, cursor:"pointer"}}
       onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
      />
      
    </Marker>
    {pin._id === currentPlaceId && (
    <Popup longitude={pin.long} latitude={pin.lat}
    anchor="bottom"
    closeButton={true}
    closeOnClick={false}
    >
    <div className="card">
              <label>Place</label>
              <h4 className="place">{pin.title}</h4>
              <label>Review</label>
              <p className="desc">{pin.desc}</p>
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
         anchor="top" >
              <RoomIcon style={{fontSize:50, cursor:"pointer"}}/>
              
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


