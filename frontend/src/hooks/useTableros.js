
import { useState, useEffect } from "react";
import { fetchTableros } from "../services/TableroService";

export const useTableros = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableros, setTableros] = useState([]);
        
        // Obtener todos los tableros
        useEffect(() => {
            const fetchTableroData = async () => {
                try{
                    const tablerosData = await fetchTableros();
                    setTableros(tablerosData);
                    console.log("Se cargaron los tableros");
                    console.log(tablerosData);
                }catch(error){
                    setError("Error al cargar los tablero.");
                    console.error(error);
                }finally{
                    setLoading(false);
                }
            };
            fetchTableroData();
        },[])
        
    return { tableros ,loading, error};
}