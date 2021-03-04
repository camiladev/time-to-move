import style from '../styles/components/Login.module.css';

import { FaGithub, FaArrowRight } from 'react-icons/fa';

export function Login(){

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
                        <form>
                            <input type="text" placeholder="Digite seu username"/>
                            <button type="button"><FaArrowRight /></button>

                        </form>
                    </div>

                </div>
            </section>

        </div>
    )
}