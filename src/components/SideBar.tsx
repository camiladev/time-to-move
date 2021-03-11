import style from '../styles/components/SideBar.module.css'

import { ImHome, ImExit } from "react-icons/im";
import { FiAward } from "react-icons/fi";
import { RiTodoFill } from "react-icons/ri";

export default function SideBar(){

    return(
        
            <div className={style.sideBarContainer}>
                <header>
                    <img src="logo.png" alt="Logo"/>
                </header>
                <div>
                    {/* Icones */}
                    <a href="#"><ImHome /></a>
                    <a href="#"><FiAward /></a>
                    <a href="#"><RiTodoFill /></a>
                </div>
                <footer>
                    {/* icone de saida */}
                    <a href="#"><ImExit /></a>
                </footer>
            </div>
        
    )
}