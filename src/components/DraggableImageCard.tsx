import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, TrashIcon } from "lucide-react";

interface DraggableImageCardProps {
  id: string;
  image: string;
  title: string;
  isDragging?: boolean;
  isLocked?: boolean;
  onEyeClick: () => void;
  onDelete: () => void;
}

function DraggableImageCard({
  id,
  image,
  title,
  isDragging = false,
  isLocked = false,
  onEyeClick,
  onDelete,
}: DraggableImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: activeDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging || activeDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isLocked ? {} : { ...attributes, ...listeners })}
      className={`relative aspect-square rounded-xl overflow-hidden shadow-md cursor-${
        isLocked ? "default" : "grab"
      } bg-white hover:shadow-lg transition-all ${
        activeDragging ? "ring-2 ring-[#890000]" : ""
      }`}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-white text-center p-2 transition-opacity">
          <p className="font-semibold text-sm">{title}</p>
          <div className="flex gap-2">
            <button
              className="cursor-pointer bg-blue-400 p-2 mt-2 rounded hover:bg-blue-500"
              onClick={onEyeClick}
            >
              <Eye />
            </button>
            <button
              className="cursor-pointer bg-red-400 p-2 mt-2 rounded hover:bg-red-500"
              onClick={onDelete}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DraggableImageCard;
