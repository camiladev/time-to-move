import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import authFirebase, {firebaseAuth} from "../config/firebase/firebaseAuth"

import { Login } from "../components/Login";
import { useRouter } from "next/router";
import getUsers from "../repositories/user";


interface AuthContextData{
    userName: string;
    isLogged: boolean;
    isLoading: boolean;
    userLoggedIn: ValueData;
    handleInput(value: React.ChangeEvent<HTMLInputElement>): void;
    handleSubmitSignIn: () => void;
    logOut: () => void;
    handleSubmitWithGoogle: () => void;
}

interface ValueData{
    avatar_url: string;
    name: string;
    origin: string;
}

interface AuthProviderProps {
    children: ReactNode;
    
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( {children }:AuthProviderProps ){
    const [authUser, isAuthLoading, authErro] = useAuthState(firebaseAuth)

    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [userName, setUserName] = useState('');

    const [isLogged, setIsLogged] = useState(false);

    const router = useRouter();

    const isFirebaseLoggedIn = !isAuthLoading && !authErro;
    const isAuthenticated = isFirebaseLoggedIn && userLoggedIn;

    useEffect(() => {

        if (isFirebaseLoggedIn && !userLoggedIn && authUser) {
            //console.log("user ", authUser.displayName);
            setUserLoggedIn({
                name: authUser.displayName,
                avatar_url: authUser.photoURL,
                origin: 'Firebase',
            })  
            setIsLogged(true); 
        }
        if (!isAuthLoading) {
            setIsLoading(false)
        }
    },[authUser, isAuthLoading, isFirebaseLoggedIn, userLoggedIn])    

    function handleInput(value: React.ChangeEvent<HTMLInputElement>): void{
        const user = value.currentTarget.value;
        setUserName(user)
    }

    async function handleSubmitSignIn(){      
        
        try{
            const response = await getUsers(userName); 
            
            setUserLoggedIn({
                name: response.name,
                avatar_url: response.avatar_url,
                origin: 'Github',
            }) 
            setIsLogged(true);      
            
        }catch(error){
            alert("Usuário não localizado!!")
        }
        
    }

    async function handleSubmitWithGoogle() {
        await authFirebase.googleLogIn();
    }

    async function logOut(){
        await authFirebase.googleLogOn();
        setUserLoggedIn(null)
        setUserName('');
        router.push('/');
        setIsLogged(false);
    }

    return(
        <AuthContext.Provider value={{
            userName,
            isLogged,
            isLoading,
            userLoggedIn,
            handleInput,
            handleSubmitSignIn,
            logOut,
            handleSubmitWithGoogle
        }}>
            
            { isLogged ? children : <Login /> }
 
        </AuthContext.Provider>
    )
}