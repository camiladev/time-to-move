import style from '../styles/components/Login.module.css';

import { FaGithub, FaArrowRight } from 'react-icons/fa';

export function Login(){

    return(
        <div className={style.loginContainer}>
            <section>
                <h1>TimeToMove</h1>

                <strong>Bem-vindo</strong>
                <p>
                   <FaGithub /> 
                    Faça login com seu Github para começar
                </p>
                <form>
                    <input type="text" placeholder="Digite seu username"/>
                    <button type="button"><FaArrowRight /></button>

                </form>
            </section>

        </div>
    )
}