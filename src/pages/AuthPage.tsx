
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { toast } from '@/components/ui/use-toast';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleAuth = (success: boolean, message: string, isLogin: boolean) => {
    if (success) {
      toast({
        title: isLogin ? "Login Successful" : "Account Created Successfully",
        description: message,
      });
      navigate('/');
    } else {
      toast({
        title: isLogin ? "Login Failed" : "Signup Failed",
        description: message,
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
              <LoginForm onLogin={(success, message) => handleAuth(success, message, true)} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm onSignup={(success, message) => handleAuth(success, message, false)} />
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
