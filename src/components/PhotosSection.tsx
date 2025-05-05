import { Link } from "react-router";

type Photo = {
  _id: string;
  url: string;
  title: string;
};

type PhotosByDateProps = {
  albumName: string;
  photos: Photo[];
  albumID: string;
};

function PhotosSection({ albumName, photos, albumID }: PhotosByDateProps) {
  return (
    <div className="my-8 px-4 mt-30">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#890000]">{albumName}</h2>
        <Link to={`/album/${albumID}`} className="bg-[#890000] text-white px-4 py-2 rounded-xl hover:bg-[#6f0000] transition-colors cursor-pointer">
          View album &gt;
        </Link>
      </div>

      {/* Photos Grid */}
      <div className="grid auto-rows-[200px] grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {photos.map((photo) => (
          <div key={photo._id} className="relative overflow-hidden group rounded-xl shadow-md">
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosSection;
