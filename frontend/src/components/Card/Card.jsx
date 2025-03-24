import { useDraggable } from '@dnd-kit/core';
import { useState } from "react";
import {useCard} from "../../hooks/useCard";
import Modal from "../modal/Modal"
import { CSS } from '@dnd-kit/utilities';
import styles from "../Card/Card.module.css";

function Card({board_id, id, title, columnaId ,check}) {

    const { isChecked, toggleCheck,isLoading, error } = useCard(check);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCheckboxChange = async () => {
        
        try {
            
            await toggleCheck(board_id, columnaId, id);
        } catch (error) {
            alert("Hubo un error al actualizar la tarjeta. Por favor, inténtalo de nuevo.");
        }
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: {
            type: 'card',
            cardData: { id, title, columnaId }
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        position: 'relative',
        zIndex: transform ? 999 : 'auto',
        opacity: transform ? 0.8 : 1
    };

    

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes}
            className={styles.contenedor}
        >
            <input 
                type="checkbox"
                className={styles.checkbox}     
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={isLoading}
            />
            <p 
                onClick={openModal}
                className={styles.titulo}>
                    {title}
            </p>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Detalles de la Tarjeta</h2>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Título:</strong> {title}</p>
            </Modal>
        </div>
    );
}

export default Card;