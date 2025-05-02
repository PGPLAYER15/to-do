import React from 'react';
import styles from '../Temporizador/Temporizador.module.css';

const formatTime = (time) => (time !== undefined ? time.toString().padStart(2, "0") : "00");

function Temporizador({ minutes, seconds, isWorking }) {
    return (
        <div className={styles.temporizador}>
            <div className={styles.tiempo}>
                {formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <div className={styles.responsiveText}>
                {isWorking ? 'Tiempo de trabajo' : 'Tiempo de descanso'}
            </div>
        </div>
    );
}

export default Temporizador;