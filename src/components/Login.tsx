import style from '../styles/components/Login.module.css';

import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import api from '../services/api';

export function Login(){
    const [userName, setUserName] = useState();

    function handleInput(value){
        setUserName(value.target.value)
    }

    async function handleSubmitSignIn(){

        const response = await api.get(`users/${userName}`);
        const data = response.data;
        console.log(data)
    }

    return(
        <div className={style.loginContainer}>
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