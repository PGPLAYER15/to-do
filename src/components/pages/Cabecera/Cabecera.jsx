import styles from './Cabecera.module.css'

function Cabecera() {
    return(
        <div className={styles.cabecera}>
            <button className={styles.btn_crear}> Crear </button>
        </div>
    )
}

export default Cabecera