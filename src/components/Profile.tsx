import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext'
import style from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext);
    const { userName , nameFull, imgUser } = useContext(AuthContext);
    return(
        <div className={style.profileContainer}>
            <img src={imgUser} alt={userName}/>
            <div>
                <strong>{nameFull}</strong>
                <p>
                    <img src="icons/level.svg" alt="icone level"/>
                    Level {level}
                </p>
            </div>
        </div>

    )
}