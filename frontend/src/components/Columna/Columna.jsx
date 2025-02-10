import styles from './TarjetaLista.module.css';

function Columna({titulo , card}){
    
    return(
        <>
            <div className={styles.ContenedorColumna}>
                <p className={styles.titulo}> {titulo} </p>
                <button className={styles.btn_crear_card}> Añade una tarjeta </button>
            </div>
        </>
    )

}

export default Columna;