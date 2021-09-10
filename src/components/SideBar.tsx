import style from '../styles/components/SideBar.module.css'

import { ImHome, ImExit } from "react-icons/im";
import { FiAward } from "react-icons/fi";
import { RiTodoFill } from "react-icons/ri";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ActiveLink from './ActiveLink';
import { useController } from '../contexts/ControllerContext';


export default function SideBar(){
    const { logOut } = useContext(AuthContext);
    const { isCountdownActive } = useController()
    

    useEffect(() => {
        //console.log('está ativo? ', isCountdownActive);
    }, [ isCountdownActive ])
    
    return(
        
            <div className={style.sideBarContainer}>
                <header>
                    <img src="logo.png" alt="Logo"/>
                </header>
                <div>
                    <ul>
                        <li>
                            <ActiveLink href="/">
                                <a><ImHome /></a>
                            </ActiveLink>
                        </li>
                        <li>
                            {isCountdownActive ? (
                                <span className={style.disabledCursor}>
                                    <a><FiAward /></a>
                                </span>
                                
                            ) : (
                                <ActiveLink href="/leaderboard">
                                    <a><FiAward /></a>
                                </ActiveLink>
                            )}
                        </li>
                        {/* <li>
                            <ActiveLink href="/todo">
                                <a href="#"><RiTodoFill /></a>
                            </ActiveLink>
                        </li> */}
                    </ul>
                    
                </div>
                <footer>
                    {/* icone de saida */}
                    <button onClick={logOut}><ImExit /></button>
                </footer>
            </div>
        
    )
}