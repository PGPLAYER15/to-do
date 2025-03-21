import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from "../Card/Card.module.css";

function Card({ id, title, columnaId }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: {
            type: 'card',
            cardData: { id, title, columnaId }
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: 'grab',
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
            <input type="checkbox" className={styles.checkbox} />
            <p className={styles.titulo}>{title}</p>
        </div>
    );
}

export default Card;