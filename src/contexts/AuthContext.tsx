import { createContext, ReactNode, useEffect, useState } from "react";

import Cookie from 'js-cookie';

import api from '../services/api';


interface AuthContextData{
    userName: string;
    nameFull: string;
    imgUser: string;
    isLogged: boolean;
    handleInput: () => {};
    handleSubmitSignIn: () => void;
}

interface ValueData{
    avatar_url: string;
    name: string;
    user: string;
}

interface AuthProviderProps {
    children: ReactNode;
    isLogged: boolean;
    nameFull: string;
    imgUser: string;
    // userName: string;
    usernameSign: string;
}


export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider( {children, ...rest}:AuthProviderProps ){
    const [userName, setUserName] = useState('');
    const [usernameSign, setUsernameSign] = useState(rest.userName ?? '')
    const [nameFull, setNameFull] = useState(rest.nameFull ?? '');
    const [imgUser, setImgUser] = useState(rest.imgUser ?? '');

    const [isLogged, setIsLogged] = useState(rest.isLogged ?? false);

//rest.isLogged ?? 
    //Salva se o usuário estiver logado
    useEffect(() => {
        Cookie.set('isLogged', String(isLogged));
        Cookie.set('nameFull', String(nameFull));
        Cookie.set('imgUser', String(imgUser));
        Cookie.set('usernameSign', String(usernameSign));
        
    }, [isLogged,
        nameFull,
        imgUser,

        ]);

    function handleInput(value){
        const user = value.target.value;
        setUserName(user)
    }

    async function handleSubmitSignIn(){
        
        try{
            const response = await api.get(`users/${userName}`);
            const data: ValueData = response.data;
            setNameFull(data.name);
            setImgUser(data.avatar_url);
            setIsLogged(true);
            setUsernameSign(data.user);
            
        }catch(error){
            alert("Usuário não localizado!!")
        }
    }

    return(
        <AuthContext.Provider value={{
            userName,
            nameFull,
            imgUser,
            isLogged,
            handleInput,
            handleSubmitSignIn
        }}>
            
            { children  }
            
        </AuthContext.Provider>
    )
}