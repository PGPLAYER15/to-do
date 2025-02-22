import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cabecera from "../../components/Cabecera/Cabecera.jsx";
import Fondo from "../../components/Fondo/Fondo.jsx";
import Menu from "../../components/Menu/Menu.jsx";
import styles from "./Home.module.css";

function Home() {
    const [tableros, setTableros] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTableros = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/boards/");
                setTableros(response.data);
            } catch (error) {
                console.error("Error al obtener tableros:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTableros();
    }, []);

    if (loading) return <div>Cargando tableros...</div>;

    return (
        <Fondo>
            <Cabecera />
            <div className={styles.container}>
                <Menu />
                <div className={styles.boardSection}>
                    <h1>Mis Tableros</h1>
                    <div className={styles.boardGrid}>
                        {tableros.map(tablero => (
                            <div
                                key={tablero.id}
                                className={styles.boardCard}
                                onClick={() => navigate(`/tablero/${tablero.id}`)}
                            >
                                <h3>{tablero.title}</h3>
                                <div 
                                    className={styles.boardPreview}
                                    style={{ backgroundColor: "#f0f0f0" }}
                                >
                                    {/* Preview del tablero */}
                                    {tablero.lists?.slice(0, 3).map((lista, index) => (
                                        <div key={index} className={styles.miniList}>
                                            {lista.cards?.slice(0, 3).map((card, i) => (
                                                <div key={i} className={styles.miniCard}></div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fondo>
    );
}

export default Home;