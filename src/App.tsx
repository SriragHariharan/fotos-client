import PhotosSection from "./components/PhotosSection"
import Topbar from "./components/Topbar"

function App() {
  return (
    <>
      <Topbar />
      <div className="md:mx-48">
        <PhotosSection date="April 24, 2025"
          photos={[
            {
              id: "1",
              src: "https://picsum.photos/2900",
              caption: "lorem ipsum doler ist amet is a simple dummy text in the typesetting industry and everyone uses it quiet commonly caption: lorem ipsum doler ist amet is a simple dummy text in the typesetting industry and everyone uses it quiet commonly",
            },
            {
              id: "2",
              src: "https://picsum.photos/2900",
              caption: "Morning hike trail",
            },
            {
              id: "3",
              src: "https://picsum.photos/2900",
              caption: "Downtown vibes",
            }
          ]} 
        />
      </div>
    </>
  )
}

export default App