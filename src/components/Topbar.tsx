import { useState } from "react";
import { Menu, X } from "lucide-react";

function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-[#890000]">Fotos</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#" className="text-[#890000] font-medium hover:underline">Profile</a>
          <a href="#" className="text-[#890000] font-medium hover:underline">Albums</a>
          <button className="bg-[#890000] text-white px-4 py-1.5 rounded-xl hover:bg-[#6f0000] transition-colors">
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
          <a href="#" className="block text-[#890000] font-medium">Profile</a>
          <a href="#" className="block text-[#890000] font-medium">Albums</a>
          <button className="w-full bg-[#890000] text-white py-2 rounded-xl hover:bg-[#6f0000] transition-colors">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Topbar;
