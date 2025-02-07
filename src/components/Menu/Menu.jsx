import { useState } from 'react'
import styles from './Menu.module.css'
import logomenu from '../../assets/logomenu.svg'
import confi_logo from '../../assets/confi_logo.svg'
import reloj_logo from '../../assets/reloj_logo.svg'
import cerrar_logo from '../../assets/cerrar_logo.svg'

function Menu() {

    const [menu, setMenu] = useState(false)

    return(
    <div className={menu ? styles.menu_open : styles.menu}>
        <button onClick={()=> setMenu(!menu)} className={styles.btn_menu}> <img src={menu ? cerrar_logo : logomenu } alt="logo del menu "/> <p> {menu ? 'cerrar' : ''} </p> </button>
        <button className={styles.btn_menu}> <img src={confi_logo} /> <p> {menu ? 'Configuracion' : ''} </p> </button>
        <button className={styles.btn_menu}> <img src={reloj_logo} /> <p> {menu ? 'Pomodoro' : ''} </p></button>
    </div>
    )
}

export default Menu;