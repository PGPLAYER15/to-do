import { useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import CrearIcon from "../../assets/CrearIcon.svg";
import Columna from "../Columna/Columna";
import styles from "../Btn_crear/Btn_crear.module.css";

function Btn_crear({ columnas, agregarColumna, agregarTarjeta }) {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [tituloColumna, setTituloColumna] = useState("");
    const [columna, setColumna] = useState([]);

    
    
        const handleGuardarColumna = () => {
        if (tituloColumna.trim()) {
            agregarColumna(tituloColumna);
            setTituloColumna("");
            setMostrarInput(false);
        }
        };
    
        const handleDragEnd = ({ active, over }) => {
        if (!over) return;
    
        const activeColumnaId = active.data.current?.columnaId;
        const overColumnaId = over.data.current?.columnaId || over.id;
    
        if (activeColumnaId !== overColumnaId) {
            setColumna(prev => {
                const columnaOrigen = prev.find(c => c.id === activeColumnaId);
                const columnaDestino = prev.find(c => c.id === overColumnaId);
                const activeCard = columnaOrigen?.cards.find(c => c.id === active.id);
    
                if (!activeCard || !columnaDestino) return prev;
    
                return prev.map(col => {
                    if (col.id === activeColumnaId) {
                        return {
                            ...col,
                            cards: col.cards.filter(c => c.id !== active.id)
                        };
                    }
                    if (col.id === overColumnaId) {
                        return {
                            ...col,
                            cards: [...col.cards, activeCard]
                        };
                    }
                    return col;
                });
            });
        }
        else {
            setColumna(prev => prev.map(col => {
                if (col.id === activeColumnaId) {
                    const oldIndex = col.cards.findIndex(c => c.id === active.id);
                    const newIndex = col.cards.findIndex(c => c.id === over.id);
                    
                    return {
                        ...col,
                        cards: arrayMove(col.cards, oldIndex, newIndex)
                    };
                }
                return col;
            }));
        }
        };
    
        const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );
    
        return (
        <div className={styles.contenedor}>
            <div className={styles.columnas}>
            <DndContext
                onDragEnd={handleDragEnd}
                sensors={sensors}
                modifiers={[restrictToWindowEdges]}
                >
                {columnas.map((columna) => (
                    <SortableContext 
                    key={columna.id}
                    items={columna.cards}
                    strategy={verticalListSortingStrategy}
                >
                    <Columna
                    key={columna.id}
                    id={columna.id}
                    titulo={columna.titulo}
                    cards={columna.cards}
                    onAddCard={agregarTarjeta}
                    />
                </SortableContext>
            ))}
            </DndContext>
            
    
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
            </div>
        </div>
        );
    }

export default Btn_crear;