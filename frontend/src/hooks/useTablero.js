// hooks/useTablero.js
import { useState, useEffect } from "react";
import {
    fetchTablerobyID,
    fetchColumnas,
    crearColumna,
    crearTarjeta,
    actualizarColumna,
} from "../services/TableroService";

export const useTablero = (boardId) => {
    const [tablero, setTablero] = useState(null);
    const [columnas, setColumnas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // Obtener el tablero y las columnas al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tableroData = await fetchTablerobyID(boardId);
                const columnasData = await fetchColumnas(boardId);
                setTablero(tableroData);
                setColumnas(columnasData);
            } catch (error) {
                setError("Error al cargar los datos del tablero.");
                console.log("MMM")

                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [boardId]);

    // Agregar una nueva columna
    const agregarColumna = async (titulo) => {
        try {
            const nuevaColumna = await crearColumna(boardId, titulo);
            setColumnas((prev) => [...prev, nuevaColumna]);
        } catch (error) {
            setError("Error al crear la columna.");
            console.error(error);
        }
    };

    // Agregar una nueva tarjeta a una columna
    const agregarTarjeta = async (columnaId, tituloTarjeta) => {
        try {
            const nuevaTarjeta = await crearTarjeta(boardId, columnaId, tituloTarjeta);
            setColumnas((prev) =>
                prev.map((columna) =>
                    columna.id === columnaId
                        ? { ...columna, cards: [...(columna.cards || []), nuevaTarjeta] }
                        : columna
                )
            );
        } catch (error) {
            setError("Error al crear la tarjeta.");
            console.error(error);
        }
    };

    // Actualizar el orden de las tarjetas en una columna
    const actualizarOrdenTarjetas = async (columnaId, tarjetas) => {
        try {
            await actualizarColumna(boardId, columnaId, tarjetas);
        } catch (error) {
            setError("Error al actualizar el orden de las tarjetas.");
            console.error(error);
        }
    };

    // Función para mover una tarjeta entre columnas
    const moverTarjeta = (sourceColumnId, targetColumnId, activeCard) => {
        setColumnas((prev) => {
            const newColumns = [...prev];
            const sourceColumn = newColumns.find((c) => c.id === sourceColumnId);
            const targetColumn = newColumns.find((c) => c.id === targetColumnId);

            if (!sourceColumn || !targetColumn) return prev;

            const cardIndex = sourceColumn.cards.findIndex((c) => c.id === activeCard.id);
            const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
            targetColumn.cards.push(movedCard);

            return newColumns;
        });
    };

    return {
        tablero,
        columnas,
        loading,
        error,
        agregarColumna,
        agregarTarjeta,
        actualizarOrdenTarjetas,
        moverTarjeta,
    };
};