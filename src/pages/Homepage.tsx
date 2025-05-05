import PhotosSection from "../components/PhotosSection";
import useAlbums from "../hooks/useAlbums";

function Homepage() {
  const { albums, loading, error } = useAlbums();
  console.log(albums, loading, error);
  return (
    <div className="max-w-6xl mx-auto">
      {
        loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) 
      }
      {
        error && (
          <div className="text-red-500 text-2xl">
            {error}
          </div>
        )
      }
      {
        !loading && !error && albums?.map(album => <PhotosSection key={album.id} albumName={album.name} photos={album.images} />)
      }
    </div>
  )
}

export default Homepage