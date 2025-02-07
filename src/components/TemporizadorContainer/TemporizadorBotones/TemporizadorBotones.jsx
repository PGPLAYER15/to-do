import React from 'react';

function TemporizadorBotones({ iniciar, pausar, reiniciar, isActive }) {
    return (
        <div>
            <button onClick={isActive ? pausar : iniciar}>
                {isActive ? 'Pausar' : 'Iniciar'}
            </button>
            <button onClick={reiniciar}>
                Reiniciar
            </button>
        </div>
    );
}

export default TemporizadorBotones;