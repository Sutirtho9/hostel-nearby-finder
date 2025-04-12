
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      // In a real app, this would connect to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login for demo purposes
      const mockUser = {
        id: '123456',
        name: 'Test User',
        email: email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      // In a real app, this would connect to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup for demo purposes
      const mockUser = {
        id: '123456',
        name: name,
        email: email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };
};
