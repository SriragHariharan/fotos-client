import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


import { useState } from 'react';
import DraggableImageCard from '../components/DraggableImageCard';



// Main board
function ImageBoard({ imagesMetadata }: { imagesMetadata: any[] }) {
  const initialIds = imagesMetadata.map((_, i) => i.toString());
  const [items, setItems] = useState(initialIds);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    if (isLocked) return;
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    if (isLocked) return;
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleSaveOrder = () => {
    const reordered = items.map((id) => imagesMetadata[parseInt(id)]);
    console.log("🧩 New Order:", reordered);
  };

  return (
    <div className="w-full p-4">
      {/* Buttons */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handleSaveOrder}
          className="bg-[#890000] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#6f0000] transition-colors cursor-pointer"
        >
          Save Changes
        </button>
        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`px-6 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
            isLocked
              ? 'bg-gray-400 text-white hover:bg-gray-500'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isLocked ? 'Unlock' : 'Lock'}
        </button>
      </div>

      {/* DND context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((id) => {
              const { imageURL, title } = imagesMetadata[parseInt(id)];
              return (
                <DraggableImageCard
                  key={id}
                  id={id}
                  image={imageURL}
                  title={title}
                  isLocked={isLocked}
                />
              );
            })}
          </div>
        </SortableContext>

        {/* Drag overlay */}
        <DragOverlay>
          {activeId && !isLocked ? (
            <DraggableImageCard
              id={activeId}
              image={imagesMetadata[parseInt(activeId)].imageURL}
              title={imagesMetadata[parseInt(activeId)].title}
              isDragging={true}
              isLocked={false}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default ImageBoard;
