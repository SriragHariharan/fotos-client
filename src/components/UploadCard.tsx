type UploadCardProps = {
  imageURL: string;
  title: string;
  id: number;
  image: File;
  onDelete: (id: number) => void;
};

function UploadCard({ imageURL, title, id, onDelete }: UploadCardProps) {
    
  return (
    <div className="flex items-center border border-gray-300 rounded-lg shadow-md p-4 mb-4 w-full ">
        <img
            src={imageURL}
            alt={title}
            className="w-20 h-20 object-cover rounded mr-4"
        />
        <div className="flex-1">
            <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <button
            onClick={() => onDelete(id)}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Delete
        </button>
    </div>
  );
}

export default UploadCard;
