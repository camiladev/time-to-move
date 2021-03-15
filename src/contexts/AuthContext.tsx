import React, { createContext, ReactNode, useEffect, useState } from "react";

// import Cookie from 'js-cookie';

import api from '../services/api';
import { Login } from "../components/Login";



interface AuthContextData{
    userName: string;
    usernameSign: string;
    nameFull: string;
    imgUser: string;
    isLogged: boolean;
    isHomePage: boolean;
    handleInput(value: React.ChangeEvent<HTMLInputElement>): void;
    handleSubmitSignIn: () => void;
    logOut: () => void;
}

interface ValueData{
    avatar_url: string;
    name: string;
    login: string;
}

interface AuthProviderProps {
    children: ReactNode;
    // isLogged: boolean;
    // nameFull: string;
    // imgUser: string;
    // userName: string;
    // usernameSign: string;
}


export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider( {children }:AuthProviderProps ){
    const [userName, setUserName] = useState('');
    const [usernameSign, setUsernameSign] = useState( '')
    const [nameFull, setNameFull] = useState( '');
    const [imgUser, setImgUser] = useState( '');

    const [isLogged, setIsLogged] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);

   
//rest.isLogged ?? 
    //Salva se o usuário estiver logado
    // useEffect(() => {
    //     Cookie.set('isLogged', String(isLogged));
    //     Cookie.set('nameFull', String(nameFull));
    //     Cookie.set('imgUser', String(imgUser));
    //     Cookie.set('usernameSign', String(usernameSign));
    //     console.log('isLogged', isLogged)
        
    // }, [isLogged,
    //     nameFull,
    //     imgUser,
    //     usernameSign,
    //     ]);

    function handleInput(value: React.ChangeEvent<HTMLInputElement>): void{
        const user = value.currentTarget.value;
        setUserName(user)

    }

    async function handleSubmitSignIn(){
        
        try{
            const response = await api.get(`users/${userName}`);
            const data: ValueData = response.data;
            console.log('retorno dta ', data.login)
            setNameFull(data.name);
            setImgUser(data.avatar_url);
            setUsernameSign(data.login);
            setIsLogged(true);    
            setIsHomePage(true);       
            
        }catch(error){
            alert("Usuário não localizado!!")
        }
    }

    function logOut(){
        setUserName('');
        setIsLogged(false);
    }

    return(
        <AuthContext.Provider value={{
            userName,
            usernameSign,
            nameFull,
            imgUser,
            isLogged,
            isHomePage,
            handleInput,
            handleSubmitSignIn,
            logOut
        }}>
            
            { isLogged ? children : <Login /> }

            
        </AuthContext.Provider>
    )
}