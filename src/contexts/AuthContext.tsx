import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import authFirebase, {firebaseAuth} from "../config/firebase/firebaseAuth"

import { Login } from "../components/Login";
import { useRouter } from "next/router";
import getUsers from "../repositories/user";
import Repositores from '../repositories/user-tm';
import db from '../repositories/db'

interface DataUser {
    id: number,
    name: string,
    avatar: string,
    level: number,
    xp: number,
    currentXp: number,
    challengesCompleted: number,
}

interface AuthContextData{
    userName: string;
    nameFull: string;
    imgUser: string;
    isLogged: boolean;
    userRegistered: DataUser;
    handleInput(value: React.ChangeEvent<HTMLInputElement>): void;
    handleSubmitSignIn: () => void;
    logOut: () => void;
    handleSubmitWithGoogle: () => void;
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
    const [authUser, isAuthLoading, authErro] = useAuthState(firebaseAuth)

    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rankingUser, setRankingUser] = useState(null);
    
    const [userName, setUserName] = useState('');
    const [nameFull, setNameFull] = useState('');
    const [imgUser, setImgUser] = useState('');

    const [userRegistered, setUserRegistered] = useState(null);

    const [isLogged, setIsLogged] = useState(false);

    const router = useRouter();

    const isFirebaseLoggedIn = !isAuthLoading && !authErro;
    const isAuthenticated = isFirebaseLoggedIn && userLoggedIn;

    useEffect(() => {
        let ranking = [];

        db.getAll().onSnapshot( items => {
            items.docs.forEach((item) => {
                let data = item.data()                
                ranking.push(data)               
            })
        })
        setRankingUser(ranking)

        if (isFirebaseLoggedIn && !userLoggedIn) {
            console.log("user ", authUser?.displayName);
            setUserLoggedIn(authUser)
        }
        if (isAuthenticated && !userRegistered) {
            findUser(userLoggedIn.displayName) 
        }
        if (!isAuthLoading) {
            setIsLoading(false)
        }
    },[authUser, isAuthLoading, isFirebaseLoggedIn, userLoggedIn])

    function creteUser(newUser, id){
        console.log("userLogado ", newUser);
        
        const data = {
            id: id,
            name: newUser.displayName,
            avatar: newUser.photoURL,
            level: 1,
            xp: 0,
            currentXp: 0,
            challengesCompleted: 0,
        }

        db.createUser(data)
        .then( resp => {
            console.log("resposta create",resp);
            setUserRegistered(data)
            setIsLogged(true) 
        })
        .catch( e => {
            console.log("erro -> ",e);
            
        })

    }

    function createUserByGitHub(newUser, id){

        const data = {
            id: id,
            name: newUser.name,
            avatar: newUser.avatar_url,
            level: 1,
            xp: 0,
            currentXp: 0,
            challengesCompleted: 0,
        }
        Repositores.create(data).then( () => {
            console.log('Novo usuário registrado com sucesso')
            setIsLogged(true) 
        }).catch( err => {
            console.log('Erro de cadastro',err)
        })
    }

    function findUser(nameUser){        
        console.log("ranking ", rankingUser);
        //consulta se usuário está cadastrado
        const findUser = rankingUser.find( user => {
            const register = user.name === nameUser
            setUserRegistered(user)
            setIsLogged(true) 
            return register
        })
        console.log("findUser aqui ", findUser);   

        //se não estiver
        if(!findUser){
            const ultimoId = rankingUser.slice(-1)[0];
            creteUser(userLoggedIn, ultimoId.id + 1 )
            console.log("User não cadastrado - id ", ultimoId.id + 1);
        }

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
            findUser(response.name);             
            
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
            nameFull,
            imgUser,
            isLogged,
            userRegistered,
            handleInput,
            handleSubmitSignIn,
            logOut,
            handleSubmitWithGoogle
        }}>
            
            { isLogged ? children : <Login /> }
 
        </AuthContext.Provider>
    )
}