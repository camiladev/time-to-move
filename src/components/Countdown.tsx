
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/Countdown.module.css';

import { AiOutlineCaretRight, AiOutlineClose, AiFillCheckCircle} from 'react-icons/ai'

export function Countdown() {
    const { minutes, 
            seconds, 
            hasFinished, 
            isActive , 
            resetCountdown, 
            startCountdown 
        } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={style.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
                
            </div>
            
            { hasFinished ? (
                <button 
                    disabled
                    className={style.countdownButton}
                    
                    >
                    Ciclo Encerrado <AiFillCheckCircle />
            </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                        type="button" 
                        className={`${style.countdownButton} ${style.countdownButtonActive}`}
                        onClick={resetCountdown}
                        >
                        Abandonar ciclo <AiOutlineClose />
                    </button>

                    ) : (
                        <button 
                            type="button" 
                            className={style.countdownButton}
                            onClick={startCountdown}
                            >
                            Iniciar um ciclo <AiOutlineCaretRight />
                        </button>
                    )}
                </>
            )}

        </div>
    )
}