
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { toast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { login, signup } = useAuthContext();

  const handleLogin = async (email: string, password: string, userType: "student" | "hostelProvider") => {
    const success = await login(email, password, userType);
    if (success) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
      });
      
      // Redirect based on user type
      if (userType === "hostelProvider") {
        navigate('/post-hostel');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignup = async (name: string, email: string, password: string, userType: "student" | "hostelProvider") => {
    const success = await signup(name, email, password, userType);
    if (success) {
      toast({
        title: "Account Created Successfully",
        description: "Your account has been created and you are now logged in",
      });
      
      // Redirect based on user type
      if (userType === "hostelProvider") {
        navigate('/post-hostel');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: "Signup Failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container max-w-md mx-auto pt-20 pb-16 px-4">
      <Card className="border-hostel-blue/20 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-hostel-blue">
            {activeTab === "login" ? "Welcome Back!" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onLogin={handleLogin} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm onSignup={handleSignup} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            {activeTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-hostel-blue hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-hostel-blue hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
