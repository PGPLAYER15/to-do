import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import Card from '../Card/Card';
import CrearIcon from "../../assets/CrearIcon.svg";
import styles from './TarjetaLista.module.css';

function Columna({ id, titulo, cards, onAddCard }) {

    const { setNodeRef } = useDroppable({ 
        id: id,
        data: {
            type: 'column',
            columnaId: id
        }
    });
    
    const [mostrarInput, setMostrarInput] = useState(false);
    const [tituloTarjeta, setTituloTarjeta] = useState("");

    const handleGuardar = () => {
        if (tituloTarjeta.trim()) {
            onAddCard(id, tituloTarjeta); 
            setMostrarInput(false);
        }
    };

    return (
        <div className={styles.ContenedorColumna} ref={setNodeRef}>
            <p className={styles.titulo}>{titulo}</p>

            {cards?.map((card) => (
                <Card key={card.id} id={card.id} title={card.title} columnaId={id} />
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
                        <button onClick={handleGuardar} className={styles.btn_guardar_cancelar}>
                            Guardar
                        </button>
                        <button onClick={() => setMostrarInput(false)} className={styles.btn_guardar_cancelar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Columna;