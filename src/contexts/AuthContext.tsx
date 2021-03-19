import React, { createContext, ReactNode, useEffect, useState } from "react";

import { Login } from "../components/Login";
import { useRouter } from "next/router";
import getUsers from "../repositories/user";



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
    
}


export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider( {children }:AuthProviderProps ){
    const [userName, setUserName] = useState('');
    const [usernameSign, setUsernameSign] = useState( '')
    const [nameFull, setNameFull] = useState('');
    const [imgUser, setImgUser] = useState('');

    const [isLogged, setIsLogged] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);

    const router = useRouter();

   
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
            const response:ValueData = await getUsers(userName);
            console.log('return response ', response.login) 
            
            setNameFull(response.name);
            setImgUser(response.avatar_url);
            setUsernameSign(response.login);
            setIsLogged(true);    
            setIsHomePage(true);   
            
            
        }catch(error){
            alert("Usuário não localizado!!")
        }
        
    }

    function logOut(){
        setUserName('');
        router.push('/');
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