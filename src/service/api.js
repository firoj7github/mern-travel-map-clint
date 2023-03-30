import axios from "axios";

const url = 'https://mern-map-server.vercel.app';

export const setPin = async(data)=>{
    try{
       let res = await axios.post(`${url}/pins`, data)
       return res.data;
    } catch(err){
        console.log('Error when calling set api', err);
    }
}

export const getPin = async (data) => {
    try {
        let response = await axios.get(`${url}/pin`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling getpin API ', error);
    }
}