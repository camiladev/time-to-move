import { GetServerSideProps } from 'next';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

 
import { ChallengesProvider } from '../contexts/ChallengesContext';
import HomePage from '../pages/home'

import styles from '../styles/pages/Index.module.css'
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import SideBar from '../components/SideBar';
import { useContext } from 'react';
import Leaderboard from './leaderboard';

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
  
  // const match = useRouteMatch();
  return (
    <AuthProvider 
      isLogged = {props.isLogged}
      userName = {props.userName}
      usernameSign = {props.usernameSign}
      imgUser = {props.imgUser}
      nameFull = {props.nameFull}
      >          
          <ChallengesProvider
            level = {props.level}
            currentExperience = {props.currentExperience}
            challengesCompleted = {props.challengesCompleted}
          >
              <div className={styles.bodyContainer}>
                  <SideBar />
                          
                     
              <Router>
                <Switch>
                  <Route path="/">
                      <HomePage /> 
                  </Route>
                  <Route path="">
                      {/* <Leaderboard />  */}
                      <h1>Ola</h1>
                  </Route>
                </Switch>
              </Router>


              </div>

          </ChallengesProvider>

    </AuthProvider>
  )
}


export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level,
          currentExperience,
          challengesCompleted,
          isLogged,
          usernameSign, 
          userName,
          imgUser,
          nameFull,
        } = ctx.req.cookies;
        console.log("Atual", isLogged)
        console.log("User", usernameSign)
  return{
    props: {
      isLogged: Boolean(isLogged),
      userName: String(userName),
      usernameSign: String(usernameSign),
      imgUser: String(imgUser),
      nameFull: String(nameFull),
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}