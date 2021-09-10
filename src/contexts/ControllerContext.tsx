import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ControllerContextData{
    isCountdownActive: boolean;
    start : () => void;
}


interface ControllerProviderProps {
    children: ReactNode;
}

export const ControllerContext = createContext({} as ControllerContextData)

export function ControllerProvider({ children }: ControllerProviderProps) {
    const [isCountdownActive, setIsCountdownActive] = useState(false)

    function start(){
        setIsCountdownActive(!isCountdownActive); 
    }

    return(
        <ControllerContext.Provider value={{
            isCountdownActive,
            start,
        }}>
            {children}
        </ControllerContext.Provider>
    )
}

export const useController = () => useContext(ControllerContext)