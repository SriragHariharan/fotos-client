import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

const ImageViewModal: React.FC<ModalProps> = ({ isOpen, onClose, image, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-transparent backdrop-blur-xs" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full z-10">
        <img src={image} alt={title} className="w-full h-auto max-h-[80vh] object-contain" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewModal;
