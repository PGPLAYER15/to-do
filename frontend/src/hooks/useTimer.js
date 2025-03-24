import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isWorking, setIsWorking] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {

                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        setMinutes((prevMinutes) => {
                            if (prevMinutes === 0) {
                                setIsWorking(prev => !prev);
                                return prev ? 25 : 5;
                            }
                            return prevMinutes - 1;
                        });
                        return 59;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);
    
    const iniciar = useCallback(() => setIsActive(true), []);
    const pausar = useCallback(() => setIsActive(false), []);
    const reiniciar = useCallback(() => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
        setIsWorking(true);
    }, []);

    return { minutes, seconds, isWorking, isActive, iniciar, pausar, reiniciar };
}