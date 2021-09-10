import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
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

interface UserContextData{
    userRegistered: DataUser; 
    rankingUser: [];   
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider( { children } ){
    const { userLoggedIn } = useContext(AuthContext);
    const [ userRegistered, setUserRegistered ] = useState(null)
    const [ rankingUser, setRankingUser ] = useState(null)
    
    useEffect(() => {
        let ranking = [];       
        const lista = async () => {
            await db.getAll().onSnapshot( items => {
                items.docs.forEach( (item) => {
                    let data = item.data()                
                    ranking.push(data)                      
                })
            })

        }
        lista();
               
        if (ranking) {
            //console.log('incluindo ranking ', ranking );
            
            setRankingUser(ranking)     
            findUser(ranking)
        }
    }, [])

    async function findUser(ranking){
       let isResgistrado = false;
        (await db.getOneUser(userLoggedIn.name))
            .docs.forEach( (item) => {
                let data = item.data()                
                isResgistrado = true
                setUserRegistered(data)                        
        })
       // console.log("user registrado",isResgistrado ); 
       // console.log("rankingUser",ranking ); 
        if (!isResgistrado && ranking) {
            const ultimoId = ranking.slice(-1)[0]
            //console.log("user não cadastrado - ultimoId", ultimoId.id ); 
            creteUser(userLoggedIn, ultimoId.id + 1 )
        }
    }

    

    function creteUser(newUser, id){
        // console.log("userLogado ", newUser);
        
         const data = {
             id: id,
             name: newUser.name,
             avatar: newUser.avatar_url,
             level: 1,
             xp: 0,
             currentXp: 0,
             challengesCompleted: 0,
         }

        db.createUser(data)
         .then( resp => {
             console.log("resposta create",resp);
             setUserRegistered(data)
         })
         .catch( e => {
             console.log("erro -> ",e);
            
            })
        
        
    }

   


    return(
        <UserContext.Provider value={{
            userRegistered,
            rankingUser
        }}>
            
            { children }
 
        </UserContext.Provider>
    )
}

export const useContextUser = () => useContext(UserContext)