// services/tableroService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";


//Crear un tablero

export const crearTablero = async (nombre, descripcion, color) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/boards`, {
            title: nombre,
            description: descripcion,
            color: color,
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el tablero:", error);
        throw error;
    }
};

// Obtener todos los tableros

export const fetchTableros = async () =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/boards/`);
        return response.data;
    }catch(error){
        console.error("Error al obtener los tableros:", error);
        throw error;
    }
}

// Obtener un tablero por ID
export const fetchTablerobyID = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/boards/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el tablero:", error);
        throw error;
    }
};

// Obtener las columnas de un tablero
export const fetchColumnas = async (boardId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/boards/${boardId}/lists`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las columnas:", error);
        throw error;
    }
};

// Crear una nueva columna
export const crearColumna = async (boardId, titulo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/boards/${boardId}/lists`, {
            title: titulo,
            board_id: boardId,
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la columna:", error);
        throw error;
    }
};

// Crear una nueva tarjeta en una columna
export const crearTarjeta = async (boardId, columnaId, tituloTarjeta) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/boards/${boardId}/lists/${columnaId}/cards/create`,
            {
                title: tituloTarjeta,
                description: null,
                list_id: columnaId,
                check: false,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear la tarjeta:", error);
        throw error;
    }
};

// Actualizar el orden de las tarjetas en una columna
export const actualizarColumna = async (boardId, columnaId, tarjetas) => {
    try {
        await axios.put(`${API_BASE_URL}/boards/${boardId}/lists/${columnaId}/cards`, {
            cards: tarjetas.map((tarjeta) => tarjeta.id),
        });
    } catch (error) {
        console.error("Error al actualizar la columna:", error);
        throw error;
    }
};