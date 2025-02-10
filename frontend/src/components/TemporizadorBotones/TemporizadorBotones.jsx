import React from 'react';
import styles from '../Cabecera/Cabecera.module.css';
import PropTypes from 'prop-types';


function TemporizadorBotones({ iniciar, pausar, reiniciar, isActive }) {

    TemporizadorBotones.propTypes = {
        iniciar: PropTypes.func.isRequired,
        pausar: PropTypes.func.isRequired,
        reiniciar: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    return (
        <div className={styles.contenedor_botones}>
            <button className={styles.btn_menu_arriba} onClick={isActive ? pausar : iniciar}>
                {isActive ? 'Pausar' : 'Iniciar'}
            </button>
            <button className={styles.btn_menu_arriba} onClick={reiniciar}>
                Reiniciar
            </button>
        </div>
    );
}

export default TemporizadorBotones;