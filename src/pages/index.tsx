import { GetServerSideProps } from 'next';

 
import { ChallengesProvider } from '../contexts/ChallengesContext';
import HomePage from './home';


interface IndexProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  isLogged: boolean;
  usernameSign: string;
  userName: string;
  imgUser: string;
  nameFull: string;
}

export default function Home(props: IndexProps) {
  
  return (
          
              <ChallengesProvider
                level = {props.level}
                currentExperience = {props.currentExperience}
                challengesCompleted = {props.challengesCompleted}
              >
                <HomePage />

              </ChallengesProvider>

          

   
  )
}


export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level,
          currentExperience,
          challengesCompleted,
          
        } = ctx.req.cookies;
     
  return{
    props: {
     
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}