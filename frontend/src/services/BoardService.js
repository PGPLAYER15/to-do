import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

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