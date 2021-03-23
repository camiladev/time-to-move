import React, { createContext, ReactNode, useEffect, useState } from "react";

import { Login } from "../components/Login";
import { useRouter } from "next/router";
import getUsers from "../repositories/user";

import Repositores from '../repositories/user-tm';



interface AuthContextData{
    userName: string;
    nameFull: string;
    imgUser: string;
    isLogged: boolean;
    idUserRegistered: number;
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
    const [nameFull, setNameFull] = useState('');
    const [imgUser, setImgUser] = useState('');

    const [idUserRegistered, setIdUserRegistered] = useState(0);

    const [isLogged, setIsLogged] = useState(false);

    const router = useRouter();


    function createUser(newUser){
        Repositores.create({
            username: userName,
            name: newUser.name,
            avatar: newUser.avatar_url,
            level: 1,
            xp: 0,
            currentXp: 0,
            challengesCompleted: 0,
        }).then( () => {
            console.log('Novo usuário registrado com sucesso')
            setIsLogged(true) 
        }).catch( err => {
            console.log('Erro de cadastro',err)
        })
    }

    function findUser(userGit){
        let isRegistered = false;
        const response = Repositores.getUserAll().then( (users) => {
            if(users.length === 0){
                setIdUserRegistered(1)
                createUser(userGit);  
                return;
            }
            const ultimo = users.slice(-1)[0];

            const userFind = users.find( (user) => {
                
                const register = userName === user.username;
                isRegistered = register;
                setIdUserRegistered(user.id);   
                
                return register;
            } );
            console.log('userFind ',userFind, 'isRegistered', isRegistered)
            if(isRegistered === true ){
                
                setIsLogged(true)       
    
            }else{
                
                setIdUserRegistered(ultimo.id+1)
                createUser(userGit);    
            }    
        }).catch( (err) => {
            console.log(err) 
        })
           
                         
       
    }
 

    function handleInput(value: React.ChangeEvent<HTMLInputElement>): void{
        const user = value.currentTarget.value;
        setUserName(user)

    }

    async function handleSubmitSignIn(){
        
        try{
            const response:ValueData = await getUsers(userName);
                        
            setNameFull(response.name);
            setImgUser(response.avatar_url);
            findUser(response);             
            
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
            nameFull,
            imgUser,
            isLogged,
            idUserRegistered,
            handleInput,
            handleSubmitSignIn,
            logOut
        }}>
            
            { isLogged ? children : <Login /> }

            
        </AuthContext.Provider>
    )
}