import styles from '../styles/pages/Leaderboard.module.css'

import data from  '../repositories/user-tm'
import { useEffect, useState } from 'react';


function UserRow({user}){
    console.log('Usuários Linha ', user )
    return(
        <tr>
            <td>1</td>
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

    useEffect(() => {
        data.getUserAll()
        .then((users) => {
            setUserAll(users);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    const rows = [];
    
    if(userAll !== null){
        userAll.forEach( (user) => {
            console.log('Lista Usuários ', user )

            rows.push(
                <UserRow 
                    user = {user}
                    key = {user.id}
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