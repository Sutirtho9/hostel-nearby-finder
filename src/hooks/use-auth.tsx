
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: "student" | "hostelProvider";
}

export const useAuth = () => {
  // Try to load user from sessionStorage if available
  const savedUser = sessionStorage.getItem('user');
  const initialUser = savedUser ? JSON.parse(savedUser) : null;
  
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, userType: "student" | "hostelProvider" = "student"): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      // In a real app, this would connect to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use a name derived from the email for the demo
      const name = email.split('@')[0];
      
      // Simulate successful login for demo purposes
      const mockUser = {
        id: '123456',
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        email: email,
        userType: userType
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      // Save user to sessionStorage
      sessionStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, userType: "student" | "hostelProvider" = "student"): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This is a mock implementation
      // In a real app, this would connect to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup for demo purposes
      const mockUser = {
        id: '123456',
        name: name,
        email: email,
        userType: userType
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      // Save user to sessionStorage
      sessionStorage.setItem('user', JSON.stringify(mockUser));
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
    // Remove user from sessionStorage
    sessionStorage.removeItem('user');
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
