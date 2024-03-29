import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'

export default function HomePage(){

    return(
        
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
    )
}