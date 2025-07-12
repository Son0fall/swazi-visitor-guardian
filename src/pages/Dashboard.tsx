
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Users, UserPlus, BarChart3, Building, Clock, LogOut, Shield, 
  Calendar, TrendingUp, Eye, FileText, MapPin
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalToday: 47,
    currentlyInside: 23,
    totalDepartments: 8,
    totalFloors: 6,
    pendingCheckouts: 5
  });

  const departments = [
    { id: 1, name: 'Economic Planning Division', floor: 1, current: 8, today: 15 },
    { id: 2, name: 'Development Finance Unit', floor: 2, current: 5, today: 12 },
    { id: 3, name: 'Policy Analysis Department', floor: 3, current: 6, today: 10 },
    { id: 4, name: 'Public Investment Division', floor: 4, current: 3, today: 7 },
    { id: 5, name: 'Strategic Planning Unit', floor: 5, current: 1, today: 3 },
    { id: 6, name: 'Administration Office', floor: 6, current: 0, today: 0 }
  ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast({ title: "Logged Out", description: "Session ended successfully" });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MEPD Visitor Management</h1>
              <p className="text-sm text-gray-600">Ministry Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600">
              <Clock className="w-3 h-3 mr-1" />
              Active
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            <Button variant="default" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/register')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register Visitor
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/reports')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Visitors</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalToday}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Currently Inside</p>
                    <p className="text-3xl font-bold text-green-600">{stats.currentlyInside}</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Departments</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalDepartments}</p>
                  </div>
                  <Building className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Building Floors</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.totalFloors}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Checkouts</p>
                    <p className="text-3xl font-bold text-red-600">{stats.pendingCheckouts}</p>
                  </div>
                  <Clock className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Departments Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Departments & Visitor Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Floor {dept.floor}</Badge>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{dept.current} inside</Badge>
                        <Badge variant="outline">{dept.today} today</Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register New Visitor
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/reports')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
