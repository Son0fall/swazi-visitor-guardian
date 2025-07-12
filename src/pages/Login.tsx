
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Shield, User, Lock } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'mepd2024') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ 
          username: credentials.username, 
          role: 'admin',
          ministry: 'Economic Planning & Development'
        }));
        toast({
          title: "Login Successful",
          description: "Welcome to MEPD Visitor Management System",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Use admin/mepd2024",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MEPD VMS</h1>
              <p className="text-gray-600">Visitor Management System</p>
              <p className="text-sm text-gray-500">Ministry of Economic Planning & Development</p>
              <p className="text-xs text-gray-400">Kingdom of Eswatini</p>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Security Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      className="pl-10"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      className="pl-10"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-xs text-center text-gray-500">
                  Credentials: admin / mepd2024
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-blue-600 flex items-center justify-center p-8">
        <div className="text-center text-white space-y-6">
          <div className="w-32 h-24 mx-auto bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-4xl">🇸🇿</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Ministry of Economic Planning & Development</h2>
            <p className="text-xl text-blue-100">Kingdom of Eswatini</p>
            <p className="text-blue-200 mt-4">Secure • Efficient • Professional</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
