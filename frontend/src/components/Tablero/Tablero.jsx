import axios from "axios";
import { useState, useEffect } from "react";
import Btn_crear from "../Btn_crear/Btn_crear";
import Columna from "../Columna/Columna";
import styles from "../Tablero/Tablero.module.css";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const Tablero = ({ id }) => {
    const [columnas, setColumnas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [columna, setColumna] = useState([]);
    const [tablero, setTablero] = useState([]);
    

    const handleGuardarColumna = () => {
        if (tituloColumna.trim()) {
            agregarColumna(tituloColumna);
            setTituloColumna("");
            setMostrarInput(false);
        }
        };

        const actualizarColumna = async (columnaId, tarjetas) => {
            try {
                await axios.put(`http://localhost:8000/api/boards/${id}/lists/${columnaId}/cards`, {
                    cards: tarjetas.map(tarjeta => tarjeta.id)
                });
            } catch (error) {
                console.error("Error al actualizar columna:", error.response ? error.response.data : error.message);
            }
        };
    
        const handleDragEnd = async ({ active, over }) => {
            if (!over) return;
        
            const activeCard = active.data.current?.cardData;
            const overCard = over.data.current?.cardData;
            const sourceColumnId = activeCard?.columnaId;
            const targetColumnId = over.data.current?.columnaId || overCard?.columnaId;
        
            if (!activeCard || !sourceColumnId) return;
        
            try {
                if (sourceColumnId === targetColumnId) {
                    // Mover dentro de la misma columna
                    setColumnas(prev => prev.map(col => {
                        if (col.id === sourceColumnId) {
                            const oldIndex = col.cards.findIndex(c => c.id === activeCard.id);
                            const newIndex = col.cards.findIndex(c => c.id === (overCard?.id || over.id));
                            
                            return {
                                ...col,
                                cards: arrayMove(col.cards, oldIndex, newIndex)
                            };
                        }
                        return col;
                    }));
                } else {
                    // Mover a otra columna
                    setColumnas(prev => {
                        const newColumns = [...prev];
                        const sourceColumn = newColumns.find(c => c.id === sourceColumnId);
                        const targetColumn = newColumns.find(c => c.id === targetColumnId);
                        
                        if (!sourceColumn || !targetColumn) return prev;
        
                        const cardIndex = sourceColumn.cards.findIndex(c => c.id === activeCard.id);
                        const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
                        
                        targetColumn.cards.push(movedCard);
                        
                        return newColumns;
                    });
        
                    // Actualizar el backend
                    await actualizarColumna(sourceColumnId, columnas.find(c => c.id === sourceColumnId).cards);
                    await actualizarColumna(targetColumnId, columnas.find(c => c.id === targetColumnId).cards);
                }
            } catch (error) {
                console.error("Error al mover la tarjeta:", error);
            }
        };
        
    
        const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );
    
    useEffect(() => {
        const fetchTableros = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/boards/${id}`);
                setTablero(response.data);
            } catch (error) {
                console.error("Error al obtener tableros:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTableros();
    }, []);

    useEffect(() => {
        const fetchColumnas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/boards/${id}/lists`);
                setColumnas(response.data);
            } catch (error) {
                console.error("Error al obtener columnas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchColumnas();
    }, [id]);

    const agregarColumna = async (titulo) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/boards/${id}/lists/`, {
                title: titulo,
                board_id: id
            });
            setColumnas([...columnas, response.data]);
        } catch (error) {
            console.error("Error al crear columna:", error);
        }
    };

    const agregarTarjeta = async (columnaId, tituloTarjeta) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/boards/${id}/lists/${columnaId}/`,
                {
                    title: tituloTarjeta,
                    description: null, 
                    list_id: columnaId
                }
            );
            setColumnas(prev => 
                prev.map(columna => 
                    columna.id === columnaId
                    ? { ...columna, cards: [...columna.cards, response.data] }
                    : columna
                )
            );
        } catch (error) {
            console.error("Error al crear tarjeta:", error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <div>Cargando columnas...</div>;

    return (
        <div className={styles.tablero}>
            <h1> {tablero.title} </h1>
            
            <div className={styles.columnas}>
                <DndContext
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    modifiers={[restrictToWindowEdges]}
                >
                    {columnas.map(columna => (
                        <SortableContext 
                            key={columna.id}
                            items={columna.cards.map(card => card.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Columna 
                                key={columna.id}
                                id={columna.id}
                                titulo={columna.title}
                                cards={columna.cards}
                                onAddCard={agregarTarjeta}
                            />
                        </SortableContext>
                    ))}
                </DndContext>
                
                <Btn_crear 
                    agregarColumna={agregarColumna} 
                />
            </div>
        </div>
    );
};

export default Tablero;