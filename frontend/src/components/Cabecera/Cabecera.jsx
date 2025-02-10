import React, { useCallback } from 'react';
import styles from './Cabecera.module.css';
import Temporizador from '../Temporizador/Temporizador';
import TemporizadorBotones from '../TemporizadorBotones/TemporizadorBotones';
import useTimer from '../../hooks/useTimer';

function Cabecera() {
    const { minutes, seconds, isWorking, isActive, iniciar, pausar, reiniciar } = useTimer();

    return(
        <div className={styles.cabecera}>
            <div className={styles.cabecera__left_group}>
                <button className={styles.btn_espacio}>Espacio de trabajo</button>
                <button className={styles.btn_menu_arriba}>Crear</button>
            </div>
            
            <div className={styles.contenedor_tempo}>
                <TemporizadorBotones 
                    iniciar={iniciar} 
                    pausar={pausar} 
                    reiniciar={reiniciar} 
                    isActive={isActive} 
                />
                <Temporizador 
                    minutes={minutes} 
                    seconds={seconds} 
                    isWorking={isWorking} 
                />
            </div>
        </div>
    )
}

export default Cabecera;