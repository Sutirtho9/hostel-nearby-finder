import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-hostel-blue font-bold text-2xl">Hostel<span className="text-hostel-orange">Connect</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-700 hover:text-hostel-blue transition">
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-hostel-blue transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-hostel-blue transition">Contact</Link>
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-hostel-blue text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-hostel-blue hover:bg-hostel-lightBlue">
                  <User size={18} className="mr-1" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2">
            <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Home</Link>
            <Link to="/about" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">About</Link>
            <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Contact</Link>
            
            {isAuthenticated && user ? (
              <div className="py-2 px-4">
                <div className="flex items-center space-x-2 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-hostel-blue text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 flex items-center justify-center"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-1" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <div className="py-2 px-4">
                <Link to="/auth" className="block w-full">
                  <Button className="w-full bg-hostel-blue hover:bg-hostel-lightBlue">
                    <User size={18} className="mr-1" />
                    <span>Sign In</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
