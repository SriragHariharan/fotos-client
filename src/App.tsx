import { Routes, Route, BrowserRouter } from "react-router";
import UnProtectedRoute from "./components/UnprotectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import Upload from "./pages/Upload";
import ImageBoard from "./pages/ImageBoard";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* unprotected ones */}
          <Route element={<UnProtectedRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>


          {/* protected ones */}
          <Route path="/" element={ <ProtectedRoute /> }>
            <Route index element={ <Homepage /> } />
            <Route path="/create" element={ <Upload />} />
            <Route path="/album/:albumID" element={ <ImageBoard />} />
            <Route path="/profile" element={ <ProfilePage />} />
          </Route>

          <Route path="*" element={<div className='text-center text-6xl'>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App