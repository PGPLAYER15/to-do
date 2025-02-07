import React, { useState, useEffect } from 'react';
import Temporizador from './Temporizador/Temporizador';
import TemporizadorBotones from './TemporizadorBotones/TemporizadorBotones';

function TemporizadorContainer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isWorking, setIsWorking] = useState(true);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsWorking(!isWorking);
                        setMinutes(isWorking ? 5 : 25);
                        setSeconds(0);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const iniciar = () => setIsActive(true);
    const pausar = () => setIsActive(false);
    const reiniciar = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
        setIsWorking(true);
    };

    return (
        <div>
            <Temporizador minutes={minutes} seconds={seconds} isWorking={isWorking} />
            <TemporizadorBotones iniciar={iniciar} pausar={pausar} reiniciar={reiniciar} isActive={isActive} />
        </div>
    );
}

export default TemporizadorContainer;