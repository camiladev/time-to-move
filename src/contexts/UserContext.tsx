import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
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
    // isLogged: boolean;
    userRegistered: DataUser;
    
}

// interface UserProviderProps {
//     children: ReactNode;
//     ranking: [DataUser];
// }

export const UserContext = createContext({} as UserContextData);

export function UserProvider( { children } ){
    const { userLoggedIn } = useContext(AuthContext);
    const [ userRegistered, setUserRegistered ] = useState(null)
    const [ rankingUser, setRankingUser ] = useState(null)
    let ranking = [];
    useEffect(() => {
        
        db.getAll().onSnapshot( items => {
            items.docs.forEach( (item) => {
                let data = item.data()                
                ranking.push(data)                           
            })
        })
        console.log("rankingUseEffect ", ranking);
        setRankingUser(ranking)
    }, [])

    useEffect(() => {        
        console.log("userLoggedIn ", userLoggedIn);       

        //consulta se usuário está cadastrado
        if (ranking) {
            console.log("ranking ", ranking);
            const findUser = ranking.find( user => user.name === userLoggedIn.name
                //  {
                //     const register = user.name === userLoggedIn.name
                //     setUserRegistered(user)
                    
                //     console.log("register ", register);
                //     return register
                // }
            )
            console.log("findUser aqui ", findUser);           
    
            //se não estiver
            if(!findUser){
                const ultimoId = ranking.slice(-1)[0];
                //creteUser(userLoggedIn, ultimoId?.id + 1 )
                // console.log("User não cadastrado - id ", ultimoId.id + 1);
            }
        }

    }, [rankingUser])

    // function creteUser(newUser, id){
    //     console.log("userLogado ", newUser);
        
    //     const data = {
    //         id: id,
    //         name: newUser.displayName,
    //         avatar: newUser.photoURL,
    //         level: 1,
    //         xp: 0,
    //         currentXp: 0,
    //         challengesCompleted: 0,
    //     }

    //     db.createUser(data)
    //     .then( resp => {
    //         console.log("resposta create",resp);
    //         setUserRegistered(data)
    //         setIsLogged(true) 
    //     })
    //     .catch( e => {
    //         console.log("erro -> ",e);
            
    //     })

    // }

   


    return(
        <UserContext.Provider value={{
            userRegistered
        }}>
            
            { children }
 
        </UserContext.Provider>
    )
}

export const useContextUser = () => useContext(UserContext)