import React, { useEffect, useState } from 'react'
import { getPin } from '../service/api';
import Show from './Show';

const Pin =()=> {

    

    useEffect(()=>{
        const getPinDetails = async()=>{
               const data = await getPin();
               console.log(data);
               setPlace(data);
        }
        getPinDetails();
    },[])
    return (
        <div>
        
        
        
        </div>
    )
}

export default Pin
