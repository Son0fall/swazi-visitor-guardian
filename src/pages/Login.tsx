
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Shield, User, Lock } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in real implementation, this would call an API
    setTimeout(() => {
      if (credentials.username === 'guard' && credentials.password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username: credentials.username, role: 'security_guard' }));
        toast({
          title: "Login Successful",
          description: "Welcome to the Visitor Management System",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Flag */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Visitor Management System
              </h1>
              <p className="text-gray-600 mt-2">
                Ministry of Economic Planning & Development
              </p>
              <p className="text-sm text-gray-500">Kingdom of Eswatini</p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-blue-100">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Default credentials: guard / admin123
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Ministry Image */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-8">
        <div className="text-center text-white space-y-6">
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-24 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">🇸🇿</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Ministry of Economic Planning & Development
            </h2>
            <p className="text-xl text-blue-100 mb-2">Kingdom of Eswatini</p>
            <p className="text-blue-200">
              Secure Visitor Registration & Management Platform
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-sm text-blue-100">
              "Building a prosperous and sustainable economy for all Emaswati"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
