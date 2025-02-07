import styles from './Cabecera.module.css'
import Temporizador from '../TemporizadorContainer/Temporizador/Temporizador'

function Cabecera() {

    return(
        <div className={styles.cabecera}>
            <button className={styles.btn_espacio}> Espacio de trabajo </button>
            <button className={styles.btn_crear}> Crear </button>
            <Temporizador/>
        </div>
    )
}

export default Cabecera