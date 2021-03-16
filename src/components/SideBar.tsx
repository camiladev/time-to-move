import style from '../styles/components/SideBar.module.css'

import { ImHome, ImExit } from "react-icons/im";
import { FiAward } from "react-icons/fi";
import { RiTodoFill } from "react-icons/ri";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import ActiveLink from './ActiveLink';

export default function SideBar(){
    const { logOut } = useContext(AuthContext);

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
                            <ActiveLink href="/leaderboard">
                                <a><FiAward /></a>
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink href="/todo">
                                <a href="#"><RiTodoFill /></a>
                            </ActiveLink>
                        </li>
                    </ul>
                    
                </div>
                <footer>
                    {/* icone de saida */}
                    <button onClick={logOut}><ImExit /></button>
                </footer>
            </div>
        
    )
}