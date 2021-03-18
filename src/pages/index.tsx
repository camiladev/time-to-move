import { GetServerSideProps } from 'next';

 
import { ChallengesProvider } from '../contexts/ChallengesContext';
import HomePage from './home';
import style from '../styles/pages/Index.module.css';


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
          <div className={style.container}>
              <ChallengesProvider
                level = {props.level}
                currentExperience = {props.currentExperience}
                challengesCompleted = {props.challengesCompleted}
              >
                <HomePage />

              </ChallengesProvider>

          </div>

          

   
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