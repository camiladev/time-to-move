
import styles from '../styles/pages/Leaderboard.module.css'


export default function Leaderboard(){

    return(
        <div className={styles.container}>
            <h1>Ranking</h1>
            <table>
                <thead>
                    <tr>
                        <th>POSIÇÃO</th> 
                        <th>USUÁRIO</th>
                        <th>DESAFIOS</th>
                        <th>EXPERIÊNCIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <div>
                                <img src="https://github.com/camiladev.png" alt="{userName}"/>
                                <div>
                                    <strong>Camila Matos</strong>
                                    <p>
                                        <img src="icons/level.svg" alt="icone level"/>
                                        Level 1
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>
                                5 completados
                            </p>
                        </td>
                        <td>
                            <p>
                                15400 xp
                            </p>
                        </td>
                    </tr>

                    {/* nova linha */}

                    <tr>
                        <td>1</td>
                        <td>
                            
                            <div>
                                <img src="https://github.com/camiladev.png" alt="{userName}"/>
                                <div>
                                    <strong>Camila Matos</strong>
                                    <p>
                                        <img src="icons/level.svg" alt="icone level"/>
                                        Level 1
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>
                                5 completados
                            </p>
                        </td>
                        <td>
                            <p>
                                15400 xp
                            </p>
                        </td>
                    </tr>

                    {/* nova linha */}

                    <tr>
                        <td>1</td>
                        <td>
                            
                            <div>
                                <img src="https://github.com/camiladev.png" alt="{userName}"/>
                                <div>
                                    <strong>Camila Matos</strong>
                                    <p>
                                        <img src="icons/level.svg" alt="icone level"/>
                                        Level 1
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>
                                5 completados
                            </p>
                        </td>
                        <td>
                            <p>
                                15400 xp
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}