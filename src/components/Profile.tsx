import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext'
import { useContextUser } from '../contexts/UserContext';
import style from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext);
    const { userRegistered } = useContextUser();
    
    return userRegistered && (
        <div className={style.profileContainer}>
            <img src={userRegistered.avatar} alt={userRegistered.name}/>
            <div>
                <strong>{userRegistered.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="icone level"/>
                    Level {level}
                </p>
            </div>
        </div>

    )
}