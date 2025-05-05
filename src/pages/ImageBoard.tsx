import { useEffect, useState } from 'react';
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
import DraggableImageCard from '../components/DraggableImageCard';
import ImageViewModal from '../modals/ImageViewModal';
import { useParams } from 'react-router';
import useAlbumDetails from '../hooks/useAlbumDetails';
import { format } from 'date-fns';
import axiosInstance from '../axios/axios';

function ImageBoard() {
  const { albumID } = useParams<{ albumID: string }>();

  const { albumDetails, loading, error } = useAlbumDetails({ albumID });

  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if (albumDetails?.images) {
      setItems(albumDetails.images.map((img) => img._id));
    }
  }, [albumDetails]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    if (isLocked) return;
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    if (isLocked) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
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
    if (!albumDetails?.images) return;
    const reordered = items.map((id) =>
      albumDetails.images.find((img) => img._id === id)
    );
    console.log('🧩 New Order:', reordered);
    axiosInstance.put(`/album/${albumID}`, { images: reordered })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err?.response?.data?.message);
    })
  };

  const openModal = (image: string, title: string) => {
    setModalImage(image);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteImage = (idToDelete: string) => {
    setItems((prev) => prev.filter((id) => id !== idToDelete));
    // TODO: Optional API call to delete image
  };

  if (loading) {
    return <div className="w-full p-4">Loading album details...</div>;
  }

  if (error) {
    return <div className="w-full p-4">Error: {error}</div>;
  }

  if (!albumDetails) {
    return <div className="w-full p-4">Album not found</div>;
  }

  const formattedDate = albumDetails.updatedAt
    ? format(new Date(albumDetails.updatedAt), 'MMMM d, yyyy')
    : 'unknown date';

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between my-12">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{albumDetails.name}</h1>
          <div className="text-xs font-semibold text-gray-400">
            {albumDetails.images.length} photos ▪️ last edited: {formattedDate} ▪️ Private
          </div>
        </div>
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
      </div>

      {/* DnD area */}
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
              const imageData = albumDetails.images.find((img) => img._id === id);
              if (!imageData) return null;

              return (
                <DraggableImageCard
                  key={id}
                  id={id}
                  image={imageData.url}
                  title={imageData.title}
                  isLocked={isLocked}
                  onEyeClick={() => openModal(imageData.url, imageData.title)}
                  onDelete={() => handleDeleteImage(id)}
                />
              );
            })}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && !isLocked &&
            (() => {
              const activeImage = albumDetails.images.find((img) => img._id === activeId);
              return activeImage ? (
                <DraggableImageCard
                  id={activeId}
                  image={activeImage.url}
                  title={activeImage.title}
                  isDragging={true}
                  isLocked={false}
                  onEyeClick={() => {}}
                  onDelete={() => {}}
                />
              ) : null;
            })()}
        </DragOverlay>
      </DndContext>

      {/* Modal */}
      <ImageViewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={modalImage}
        title={modalTitle}
      />
    </div>
  );
}

export default ImageBoard;
