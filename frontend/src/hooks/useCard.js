import { useState } from 'react';
import { updateCardCheckStatus } from '../services/CardService';

export const useCard = (initialCheck) => {
    const [isChecked, setIsChecked] = useState(initialCheck);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    const toggleCheck = async (board_id, columnaId, card_id) => {
        if (isLoading) return; // Evitar múltiples clics
        setIsLoading(true);
        setError(null);

        try {
            const newCheckValue = !isChecked;
            await updateCardCheckStatus(board_id, columnaId, card_id, newCheckValue);
            setIsChecked(newCheckValue);
        } catch (error) {
            console.error("Error updating card status:", error);
            setError("Hubo un error al actualizar la tarjeta. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isChecked, toggleCheck, isLoading, error };
};