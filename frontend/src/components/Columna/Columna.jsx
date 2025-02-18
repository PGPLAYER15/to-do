import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import Card from '../Card/Card';
import CrearIcon from "../../assets/CrearIcon.svg";
import styles from './TarjetaLista.module.css';

function Columna(props) {
    const { setNodeRef } = useDroppable({ 
        id: props.id,
        data: { columnaId: props.id } 
    });
    const [mostrarInput, setMostrarInput] = useState(false);
    const [tituloTarjeta, setTituloTarjeta] = useState("");

    const handleGuardar = () => {
        if (tituloTarjeta.trim()) {
            props.onAddCard(props.id, tituloTarjeta);
            setTituloTarjeta("");
            setMostrarInput(false);
        }
    };

    return (
        <div className={styles.ContenedorColumna} ref={setNodeRef}>
            <p className={styles.titulo}>{props.titulo}</p>
            
            {props.cards.map((card) => (
                <Card 
                    key={card.id} 
                    id={card.id} 
                    title={card.title}
                    columnaId={props.id}
                />
            ))}
            
            {!mostrarInput ? (
                <button 
                    onClick={() => setMostrarInput(true)}
                    className={styles.btn_crear_card}
                >
                    <img src={CrearIcon} alt="" />
                    Añade una tarjeta
                </button>
            ) : (
                <div className={styles.contenedor_input}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={tituloTarjeta}
                        onChange={(e) => setTituloTarjeta(e.target.value)}
                        autoFocus
                    />
                    <div className={styles.contenedor_botones}>
                        <button onClick={handleGuardar} className={styles.btn_guardar}>
                            Guardar
                        </button>
                        <button 
                            onClick={() => setMostrarInput(false)}
                            className={styles.btn_cancelar}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Columna;