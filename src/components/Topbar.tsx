import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";

function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_NAME);
    navigate("/login");
  }

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <Link to="/" className="text-2xl font-bold text-[#890000]">Fotos</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/create" className="block text-[#890000] font-medium">Create</Link>
          <Link to="/profile" className="text-[#890000] font-medium hover:underline">Profile</Link>
          {/* <Link to="/" className="text-[#890000] font-medium hover:underline">Albums</Link> */}
          <button onClick={handleLogout} className="bg-[#890000] text-white px-4 py-1.5 rounded-xl hover:bg-[#6f0000] transition-colors">
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#890000] focus:outline-none">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-3">
          <Link to="/" className="block text-[#890000] font-medium">Create</Link>
          <Link to="/profile" className="block text-[#890000] font-medium">Profile</Link>
          {/* <Link to="/" className="block text-[#890000] font-medium">Albums</Link> */}
          <button onClick={handleLogout} className="w-full bg-[#890000] text-white py-2 rounded-xl hover:bg-[#6f0000] transition-colors cursor-pointer">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Topbar;
