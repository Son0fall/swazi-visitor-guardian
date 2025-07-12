
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  BarChart3, 
  Building, 
  Clock,
  LogOut,
  Shield,
  Calendar,
  TrendingUp
} from 'lucide-react';
import VisitorRegistration from '@/components/VisitorRegistration';
import ReportsView from '@/components/ReportsView';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [showRegistration, setShowRegistration] = useState(false);
  const [todayStats, setTodayStats] = useState({
    totalVisitors: 23,
    activeVisitors: 8,
    departments: 6,
    floors: 6
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const departments = [
    { name: 'Economic Planning', floor: 1, visitors: 5, color: 'bg-blue-500' },
    { name: 'Development Finance', floor: 2, visitors: 3, color: 'bg-green-500' },
    { name: 'Policy Analysis', floor: 3, visitors: 7, color: 'bg-purple-500' },
    { name: 'Public Service', floor: 4, visitors: 4, color: 'bg-orange-500' },
    { name: 'Ministry of Finance', floor: 5, visitors: 2, color: 'bg-red-500' },
    { name: 'Administration', floor: 6, visitors: 2, color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Visitor Management System
              </h1>
              <p className="text-sm text-gray-600">Ministry of Economic Planning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Clock className="w-3 h-3 mr-1" />
              Active Session
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeView === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('overview')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100"
              onClick={() => setShowRegistration(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register Visitor
            </Button>
            <Button
              variant={activeView === 'reports' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('reports')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Reports & Analytics
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today's Visitors</p>
                        <p className="text-3xl font-bold text-blue-600">{todayStats.totalVisitors}</p>
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
                        <p className="text-3xl font-bold text-green-600">{todayStats.activeVisitors}</p>
                      </div>
                      <Clock className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Departments</p>
                        <p className="text-3xl font-bold text-purple-600">{todayStats.departments}</p>
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
                        <p className="text-3xl font-bold text-orange-600">{todayStats.floors}</p>
                      </div>
                      <Building className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Departments Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Departments & Floors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                          <Badge variant="secondary">Floor {dept.floor}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-600">
                          {dept.visitors} visitor{dept.visitors !== 1 ? 's' : ''} today
                        </p>
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
                      onClick={() => setShowRegistration(true)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Register New Visitor
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveView('reports')}
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
            </div>
          )}

          {activeView === 'reports' && <ReportsView />}
        </main>
      </div>

      {/* Visitor Registration Modal */}
      {showRegistration && (
        <VisitorRegistration 
          onClose={() => setShowRegistration(false)}
          onSuccess={() => {
            setShowRegistration(false);
            setTodayStats(prev => ({
              ...prev,
              totalVisitors: prev.totalVisitors + 1,
              activeVisitors: prev.activeVisitors + 1
            }));
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
