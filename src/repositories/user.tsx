const URL = "http://localhost:8080/TimeToMove";

import api from '../services/api';

interface ValueData{
    avatar_url: string;
    name: string;
    login: string;
}

export default async function getUsers(userName){
    try{
        const response = await api.get(`users/${userName}`);
        const data: ValueData = response.data;
                
        return data;
        
    }catch(error){
        console.log(error)
    }
   
}