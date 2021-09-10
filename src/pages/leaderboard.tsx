import styles from '../styles/pages/Leaderboard.module.css'

import data from  '../repositories/user-tm'
import { useEffect, useState } from 'react';
import { useContextUser } from '../contexts/UserContext';
import loadConfig from 'next/dist/next-server/server/config';
import db from '../repositories/db'

function UserRow({user, ranking}){

    return(
        <tr>
            <td>{ranking}</td>
                <td>
                    <div>
                        <img src={user.avatar} alt={user.name}/>
                         <div>
                            <strong>{user.name}</strong>
                                <p>
                                    <img src="icons/level.svg" alt="icone level"/>
                                        Level {user.level}
                                </p>
                        </div>
                    </div>
                </td>
                <td>
                    <p>
                        <span>{user.challengesCompleted}</span> completados
                    </p>
                </td>
                <td>
                    <p>
                        <span>{user.xp}</span> xp
                    </p>
                </td>
        </tr>
    );

}

export default function Leaderboard(){
    const [userAll, setUserAll] = useState(null);
    const { rankingUser } = useContextUser();

    useEffect(() => {
        console.log('Ranking - ', rankingUser);
        let listUser = []
        const lista = async () => {
            await db.getAll().orderBy('xp', 'desc').onSnapshot( items => {
                items.docs.forEach( (item) => {
                    let data = item.data()                
                      listUser.push(data)                       
                })
            })
            if (listUser) {
                setUserAll(listUser)
            }
            
        }
        lista();
        // data.getUserAll()
        // .then((users) => {
        //     users.sort( (a , b) => {
        //         return a.xp < b.xp
        //     })
        //     setUserAll(users);
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });
    }, []);

    const rows = [];
    var ranking = 0;
    if(userAll){
        console.log('userAll - ', userAll);
        userAll.forEach( (user) => {
            
            ranking = ranking + 1
            rows.push(
                <UserRow 
                    user = {user}
                    key = {user.id}
                    ranking = {ranking}
                />
            )
        } )

    }

    return(
        <div className={styles.container}>
            <h1>Ranking</h1>
            <table>
                <thead>
                    <tr>
                        <th>POSIÇÃO</th> 
                        <th>USUÁRIO</th>
                        <th>DESAFIOS</th>
                        <th>EXPERIÊNCIA</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}