import api from '../services/api';

interface ValueData{
    avatar_url: string;
    name: string;
    login: string;
}



export default async function getUsers(userName:string){
    try{
        const response = await api.get(`users/${userName}`);
        const data: ValueData = response.data;
        console.log('return data ', data.login)    
        return data;
        
    }catch(error){
        console.log('api git', error)
    }
   
}



