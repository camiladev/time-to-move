import { GetServerSideProps } from 'next'; 
import { ChallengesProvider } from '../contexts/ChallengesContext';
import HomePage from './home';
import { useContextUser, UserProvider } from '../contexts/UserContext';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


interface IndexProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  isLogged: boolean;
  xp: number;
}

export default function Home(props: IndexProps) {
  const {isLoading} = useContext(AuthContext)
  
  return isLoading ? (
    <div>Carrengando dados ;)</div>
  ) : (
    <UserProvider >
              <ChallengesProvider
                level = {props.level}
                currentExperience = {props.currentExperience}
                challengesCompleted = {props.challengesCompleted}
                xp = {props.xp}
              >
                <HomePage />

              </ChallengesProvider>  
    </UserProvider>

  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level,
          currentExperience,
          challengesCompleted,
          xp,          
        } = ctx.req.cookies;
  
  return{
    props: {
     
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      xp: Number(xp)
    }
  }
}