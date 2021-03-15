import styles from '../styles/pages/Index.module.css'


import SideBar from "./SideBar";


export default function Layout({ children }){
    

    return(
        <div className={styles.bodyContainer}>           
                <SideBar />          
            
                { children }             

            
            
      </div>
    )

}