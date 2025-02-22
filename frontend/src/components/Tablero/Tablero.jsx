import axios from "axios";
import { useState, useEffect } from "react";
import Btn_crear from "../Btn_crear/Btn_crear";
import styles from "../Tablero/Tablero.module.css";

const Tablero = ({ id }) => {
    const [columnas, setColumnas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarTablero = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/boards/${id}`);
                setColumnas(response.data.lists || []);
            } catch (error) {
                console.error("Error al cargar el tablero:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarTablero();
    }, [id]);

    const guardarTablero = async (columnasActualizadas) => {
        try {
            await axios.put(`http://localhost:8000/api/boards/${id}`, {
                lists: columnasActualizadas
            });
        } catch (error) {
            console.error("Error al guardar el tablero:", error);
        }
    };

    const agregarColumna = async (titulo) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/lists/`, {
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
            const response = await axios.post(`http://localhost:8000/api/cards/`, {
                title: tituloTarjeta,
                list_id: columnaId
            });
            
            setColumnas(prev => 
                prev.map(columna => 
                    columna.id === columnaId
                    ? {...columna, cards: [...columna.cards, response.data]}
                    : columna
                )
            );
        } catch (error) {
            console.error("Error al crear tarjeta:", error);
        }
    };

    if (loading) return <div>Cargando tablero...</div>;

    return (
        <div className={styles.tablero}>
            <h1>Tablero</h1>
            <Btn_crear 
                columnas={columnas} 
                agregarColumna={agregarColumna} 
                agregarTarjeta={agregarTarjeta} 
            />
        </div>
    );
};

export default Tablero;