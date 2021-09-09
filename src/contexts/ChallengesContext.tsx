import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";
import { AuthContext } from "./AuthContext";
import Repositores from '../repositories/user-tm';
import { useContextUser } from "./UserContext";

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    completeChallenge: () => void;
    resetChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    xp: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children,
    ...rest
}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [sumXp, setSumXp] = useState(rest.xp ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const [userOn, setUserOn] = useState(null);    
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    
    const { userRegistered } = useContextUser();

    useEffect( () => {
        setUserOn(userRegistered);
        setLevel(userRegistered.level);
        setCurrentExperience(userRegistered.currentXp);
        setChallengesCompleted(userRegistered.challengesCompleted);
    } ,[]);

    //Pedir autorização para mostrar notificação
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    //Salva os dados da sessão do usuário
    useEffect(() => {
        Cookie.set('xp', String(sumXp));
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));
        
        if(userOn !== null){
            console.log('userRegistered', userOn)
            Repositores.update({
                username: userOn.username,
                name: userOn.name,
                avatar: userOn.avatar,
                level: level,
                xp: sumXp,
                currentXp: currentExperience,
                challengesCompleted: challengesCompleted,
                id: userOn.id,
            }).then( res => {
                if(res.ok){
                    console.log('Dados Atualizado')
                }
            } ).catch( error => {
                console.log('Erro ao atualizar dados -> ', error)
            })

        }

    }, [level,
        currentExperience,
        challengesCompleted,
        sumXp,
        ]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        setSumXp(sumXp + amount);

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }    

    return(
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChallenge,
            completeChallenge,
            resetChallenge,
            closeLevelUpModal
        }}>
            
            { children }
            
            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}