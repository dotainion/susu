import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

export const Droppable = ({items: itemsCopy, onDropped, onItemUpdate, children}) =>{
    const [items, setItems] = useState([...itemsCopy]);

    const sensors = useSensors(
        useSensor(PointerSensor)
    )

    return(
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({active, over}) => {
                if (!over) return;
                if (active.id !== over.id) {
                    const oldIndex = items.findIndex(item => item.id === active.id);
                    const newIndex = items.findIndex(item => item.id === over.id);
                    const reorderItems = arrayMove(items, oldIndex, newIndex);
                    setItems(()=>reorderItems);
                    onDropped?.(active, over);
                    onItemUpdate?.(reorderItems);
                }
            }}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                {typeof children === 'function' ? children(items) : children}
            </SortableContext>
        </DndContext>
    )
}

export const Draggable = ({item, disabled, children}) =>{
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: item.id,
        disabled: disabled
    });
  
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        padding: '0px'
    }
  
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {typeof children === 'function' ? children(item) : children}
        </div>
    );
}