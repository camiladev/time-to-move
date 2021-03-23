import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Repositores from '../repositories/user-tm';

 
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
  // const { idUserRegistered } = useContext(AuthContext);

  // Repositores.getOneUser(idUserRegistered).then( (user) => {
  //   console.log(user)
  // }).catch(() => {})
  // const { props } = ctx.query
  //       console.log('props', props)
  //   console.log("Experiencia inicial",currentExperience )
  return{
    props: {
     
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      xp: Number(xp)
    }
  }
}