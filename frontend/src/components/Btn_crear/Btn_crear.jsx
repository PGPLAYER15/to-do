import { useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import CrearIcon from "../../assets/CrearIcon.svg";
import Columna from "../Columna/Columna";
import styles from "../Btn_crear/Btn_crear.module.css";

function Btn_crear({ agregarColumna }) {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [tituloColumna, setTituloColumna] = useState("");

    const handleGuardarColumna = () => {
        if (tituloColumna.trim()) {
            agregarColumna(tituloColumna);
            setTituloColumna("");
            setMostrarInput(false);
        }
    };

    return (
        <div className={styles.crear}>
            {!mostrarInput ? (
                <button
                    onClick={() => setMostrarInput(true)}
                    className={styles.btn_crearlista}
                >
                    <img src={CrearIcon} alt="Crear Icono" />
                    Añadir nueva lista
                </button>
            ) : (
                <div className={styles.contenedor_input}>
                    <input
                        type="text"
                        placeholder="Título de la lista"
                        value={tituloColumna}
                        onChange={(e) => setTituloColumna(e.target.value)}
                        autoFocus
                    />
                    <div className={styles.contenedor_botones}>
                        <button onClick={handleGuardarColumna} className={styles.btn_guardar}>
                            Guardar
                        </button>
                        <button onClick={() => setMostrarInput(false)} className={styles.btn_cancelar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Btn_crear;