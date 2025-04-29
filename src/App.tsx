// import Upload  from "./pages/Upload"
// import PhotosSection from "./components/PhotosSection"
import Topbar from "./components/Topbar"
import ImageBoard from "./pages/ImageBoard"

const imageData = [
  {
    imageURL: "https://placehold.co/150/0000FF/FFFFFF?text=Image+1",
    title: "Mountain Sunrise",
    time: "2025-04-24T08:30:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/FF0000/FFFFFF?text=Image+2",
    title: "Beach Vibes",
    time: "2025-04-24T08:31:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/00FF00/000000?text=Image+3",
    title: "City Lights",
    time: "2025-04-24T08:32:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/FFFF00/000000?text=Image+4",
    title: "Rainy Window",
    time: "2025-04-24T08:33:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/FF00FF/FFFFFF?text=Image+5",
    title: "Forest Trail",
    time: "2025-04-24T08:34:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/00FFFF/000000?text=Image+6",
    title: "Desert Dunes",
    time: "2025-04-24T08:35:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/333333/FFFFFF?text=Image+7",
    title: "Snowy Peaks",
    time: "2025-04-24T08:36:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/800000/FFFFFF?text=Image+8",
    title: "Street Market",
    time: "2025-04-24T08:37:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/008080/FFFFFF?text=Image+9",
    title: "Night Sky",
    time: "2025-04-24T08:38:00Z"
  },
  {
    imageURL: "https://placehold.co/1500/FFA500/000000?text=Image+10",
    title: "Golden Hour",
    time: "2025-04-24T08:39:00Z"
  }
];


function App() {
  return (
    <>
      <Topbar />
      <div className="md:mx-48">
        {/* <PhotosSection date="April 24, 2025"
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
        />  */}

        {/* <Upload /> */}
        <ImageBoard imagesMetadata={imageData} />
      </div>
    </>
  )
}

export default App