import React, { useState } from 'react';
import styles from './Cabecera.module.css';
import Temporizador from '../Temporizador/Temporizador';
import TemporizadorBotones from '../TemporizadorBotones/TemporizadorBotones';
import Modal from '../modal/Modal';
import useTimer from '../../hooks/useTimer';
import { useBoardCabecera } from '../../hooks/useBoardCabecera';

function Cabecera() {
    const { minutes, seconds, isWorking, isActive, iniciar, pausar, reiniciar } = useTimer();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        color,
        setColor,
        error,
        isLoading,
        handleCrearTablero,
    } = useBoardCabecera();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNombre("");
        setDescripcion("");
        setColor("#ffffff");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCrearTablero();
        closeModal();
    };

    return (
        <div className={styles.cabecera}>

            <div className={styles.contenedor}>
                <div className={styles.contenedor_botones}>
                    <button
                        onClick={openModal} 
                        className={styles.btn_menu_arriba}
                        >
                            Crear
                    </button>

                    <TemporizadorBotones
                        iniciar={iniciar}
                        pausar={pausar}
                        reiniciar={reiniciar}
                        isActive={isActive}
                    />
                </div>
                
                <Temporizador
                    minutes={minutes}
                    seconds={seconds}
                    isWorking={isWorking}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Crear Tablero</h2>
                <form onSubmit={handleSubmit} className={styles.form_group}>
                    <label>Nombre del Tablero:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <label>Color:</label>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Creando..." : "Crear Tablero"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default Cabecera;