import  Head  from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Home.module.css'
import { AuthProvider } from '../contexts/AuthContext';
import SideBar from '../components/SideBar';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  isLogged: boolean;
  usernameSign: string;
  userName: string;
  imgUser: string;
  nameFull: string;
}

export default function Home(props: HomeProps) {
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

                    <div className={styles.container}>
                      <Head >
                          <title>Início | TimeToMove</title>
                      </Head >

                      <ExperienceBar />

                      <CountdownProvider>
                          <section>
                            <div>
                              <Profile />
                              <CompletedChallenges />
                              <Countdown />
                            </div>
                            <div>
                                <ChallengeBox />
                            </div>
                          </section>
                      </CountdownProvider>
                    </div>


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