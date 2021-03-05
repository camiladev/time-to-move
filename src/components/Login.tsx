import style from '../styles/components/Login.module.css';

import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';


export function Login(){
    const {userName, handleInput, handleSubmitSignIn} = useContext(AuthContext);

    return(
        <div className={style.loginContainer}>
            <Head >
                <title>Login | TimeToMove</title>
            </Head >
            <section>
                <div className={style.logo}>
                </div>
                <div>
                    <div className={style.login}>

                        <h1>
                            <img src="logo.png" alt="Logo TimeToMove"/>
                            TimeToMove
                        
                        </h1>

                        <strong>Bem-vindo</strong>
                        <p>
                        <FaGithub /> 
                            Faça login com seu Github para começar
                        </p>
                        <div className={style.form}>
                            <input 
                                type="text" 
                                value={userName}
                                onChange={handleInput}
                                placeholder="Digite seu username"
                            />
                            <button 
                                type="button"
                                onClick={handleSubmitSignIn}
                            >
                                <FaArrowRight />
                            </button>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}