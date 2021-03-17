import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: () => void;

}


interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const {startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(25 * 60); //retorna o valor em segundos de 25 minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); //retorna valor arredondado
    const seconds = time % 60; //retorna o resto da divisao, o que vem depois da virgula

    function startCountdown(){
        setIsActive(true); 
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
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
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}