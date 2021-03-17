import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    progressCycle: number;
    startCountdown: () => void;
    resetCountdown: () => void;

}


interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;
let contX: number = 0;


export function CountdownProvider({ children }: CountdownProviderProps) {
    const startTime = 25 * 60;//retorna o valor em segundos de 25 minutos
    const {startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(startTime); //retorna o valor em segundos de 25 minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const [progressCycle, setProgressCycle] = useState(0);//recebe a porcentagem da barra de progresso

    const minutes = Math.floor(time / 60); //retorna valor arredondado
    const seconds = time % 60; //retorna o resto da divisao, o que vem depois da virgula
    
    
    function progressBarButton(){
        const calcX = (100*contX)/startTime;
        // console.log('calcX ', calcX,'%');
        setProgressCycle(calcX);
    }

    function startCountdown(){
        setIsActive(true); 
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(startTime);
        setHasFinished(false);

        contX = 0;
        setProgressCycle(contX);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
                contX = contX + 1;
                // console.log('contX ', contX);
                progressBarButton();
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    
    return(
        <CountdownContext.Provider value={{
            isActive,
            hasFinished,
            minutes,
            seconds,
            progressCycle,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}