import CrearIcon from "../../assets/CrearIcon.svg"
import styles from "../Btn_crear/Btn_crear.module.css"
import { useState } from "react";
import Columna from "../Columna/Columna";

function Btn_crear() {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [columnas, setColumnas] = useState([]);

    const handleGuardar = () => {
        if (titulo.trim() !== "") {
            setColumnas([...columnas, titulo]);
            setTitulo("");
            setMostrarInput(false);
        }
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.columnas}>
                {columnas.map((columna, index) => (
                    <Columna key={index} titulo={columna} />
                ))}
                <div className={styles.crear}>
                    {!mostrarInput ? (
                        <button onClick={() => setMostrarInput(true)} className={styles.btn_crearlista}>
                            <img src={CrearIcon} alt="Crear Icono" />
                            Añadir nueva lista
                        </button>
                    ) : (
                        <div className={styles.contenedor_input}>
                            <input
                                type="text"
                                placeholder="Titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <div className={styles.contenedor_botones}>
                                <button onClick={handleGuardar} className={styles.btn_guardar}>Guardar</button>
                                <button onClick={() => setMostrarInput(false)} className={styles.btn_cancelar}>Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Btn_crear;