
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-hostel-blue font-bold text-2xl">Hostel<span className="text-hostel-orange">Connect</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-700 hover:text-hostel-blue transition">
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-hostel-blue transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-hostel-blue transition">Contact</Link>
            <Button className="bg-hostel-blue hover:bg-hostel-lightBlue">
              <User size={18} className="mr-1" />
              <span>Sign In</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2">
            <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Home</Link>
            <Link to="/about" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">About</Link>
            <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Contact</Link>
            <div className="py-2 px-4">
              <Button className="w-full bg-hostel-blue hover:bg-hostel-lightBlue">
                <User size={18} className="mr-1" />
                <span>Sign In</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
