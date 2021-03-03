import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import style from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext);
    return(
        <div className={style.profileContainer}>
            <img src="https://github.com/camiladev.png" alt="Camila Matos"/>
            <div>
                <strong>Camila Matos</strong>
                <p>
                    <img src="icons/level.svg" alt="icone level"/>
                    Level {level}
                </p>
            </div>
        </div>

    )
}