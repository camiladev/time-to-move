import { GetServerSideProps } from 'next'; 
import { ChallengesProvider } from '../contexts/ChallengesContext';
import HomePage from './home';
import data from '../services/data';
const URL_DATA = `${data.URL_BACKEND_TOP}/TimeToMove`;

interface IndexProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  isLogged: boolean;
  xp: number;
}

export default function Home(props: IndexProps) {
  
  return (

              <ChallengesProvider
                level = {props.level}
                currentExperience = {props.currentExperience}
                challengesCompleted = {props.challengesCompleted}
                xp = {props.xp}
              >
                <HomePage />

              </ChallengesProvider>  

  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level,
          currentExperience,
          challengesCompleted,
          xp,          
        } = ctx.req.cookies;
  const res = await fetch(`${URL_DATA}`);
  const json = await res.json();
 console.log(json)
  return{
    props: {
     
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      xp: Number(xp)
    }
  }
}