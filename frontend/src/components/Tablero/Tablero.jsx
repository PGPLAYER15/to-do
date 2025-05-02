import { useTablero } from "../../hooks/useTablero";
import Btn_crear from "../Btn_crear/Btn_crear";
import Columna from "../Columna/Columna";
import styles from "../Tablero/Tablero.module.css";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const Tablero = ({ id }) => {

    const {
        tablero,
        columnas,
        loading,
        error,
        agregarColumna,
        agregarTarjeta,
        actualizarOrdenTarjetas,
        moverTarjeta,
    } = useTablero(id);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = async ({ active, over }) => {
        if (!over) return;

        const activeCard = active.data.current?.cardData;
        const overCard = over.data.current?.cardData;
        const sourceColumnId = activeCard?.columnaId;
        const targetColumnId = over.data.current?.columnaId || overCard?.columnaId;

        if (!activeCard || !sourceColumnId) return;

        try {
            if (sourceColumnId === targetColumnId) {
                const updatedColumnas = columnas.map((col) => {
                    if (col.id === sourceColumnId) {
                        const oldIndex = col.cards.findIndex((c) => c.id === activeCard.id);
                        const newIndex = col.cards.findIndex((c) => c.id === (overCard?.id || over.id));
                        return {
                            ...col,
                            cards: arrayMove(col.cards, oldIndex, newIndex),
                        };
                    }
                    return col;
                });
                setColumnas(updatedColumnas);
                await actualizarOrdenTarjetas(sourceColumnId, updatedColumnas.find((c) => c.id === sourceColumnId).cards);
            } else {
                moverTarjeta(sourceColumnId, targetColumnId, activeCard); 
                await actualizarOrdenTarjetas(
                    sourceColumnId,
                    columnas.find((c) => c.id === sourceColumnId).cards
                );
                await actualizarOrdenTarjetas(
                    targetColumnId,
                    columnas.find((c) => c.id === targetColumnId).cards
                );
            }
        } catch (error) {
            console.error("Error al mover la tarjeta:", error);
        }
    };

    if (loading) return <div>Cargando columnas...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.tablero} style={{ backgroundColor: tablero?.color }}>
            <h1>{tablero?.title}</h1>
            <div className={styles.columnas}>
                <DndContext
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    modifiers={[restrictToWindowEdges]}
                >
                    {columnas.map((columna) => (
                        <SortableContext
                            key={columna.id}
                            items={columna.cards.map((card) => card.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Columna
                                board_id={id}
                                key={columna.id}
                                id={columna.id}
                                titulo={columna.title}
                                cards={columna.cards}
                                onAddCard={agregarTarjeta}
                            />
                        </SortableContext>
                    ))}
                </DndContext>
                <Btn_crear agregarColumna={agregarColumna} />
            </div>
        </div>
    );
};

export default Tablero;