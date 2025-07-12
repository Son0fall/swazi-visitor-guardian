
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Calendar, Users, Building, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Sample data for charts
  const dailyVisitors = [
    { day: 'Mon', visitors: 23 },
    { day: 'Tue', visitors: 31 },
    { day: 'Wed', visitors: 28 },
    { day: 'Thu', visitors: 47 },
    { day: 'Fri', visitors: 52 },
    { day: 'Sat', visitors: 12 },
    { day: 'Sun', visitors: 8 }
  ];

  const departmentVisitors = [
    { department: 'Economic Planning', visitors: 15, percentage: 32 },
    { department: 'Development Finance', visitors: 12, percentage: 26 },
    { department: 'Policy Analysis', visitors: 10, percentage: 21 },
    { department: 'Public Investment', visitors: 7, percentage: 15 },
    { department: 'Strategic Planning', visitors: 3, percentage: 6 }
  ];

  const monthlyTrend = [
    { month: 'Jan', visitors: 340 },
    { month: 'Feb', visitors: 425 },
    { month: 'Mar', visitors: 380 },
    { month: 'Apr', visitors: 467 },
    { month: 'May', visitors: 520 },
    { month: 'Jun', visitors: 485 }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const recentVisitors = [
    { name: 'John Smith', company: 'ABC Corp', department: 'Economic Planning', time: '14:30', status: 'Inside' },
    { name: 'Mary Johnson', company: 'XYZ Ltd', department: 'Development Finance', time: '14:15', status: 'Inside' },
    { name: 'David Wilson', company: 'Tech Solutions', department: 'Policy Analysis', time: '13:45', status: 'Checked Out' },
    { name: 'Sarah Brown', company: 'Consulting Group', department: 'Public Investment', time: '13:30', status: 'Inside' }
  ];

  const exportReport = () => {
    // In a real application, this would generate and download a PDF/Excel report
    alert('Report export functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold">Reports & Analytics</h1>
              <p className="text-sm text-gray-600">Visitor statistics and insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                    <p className="text-3xl font-bold text-blue-600">1,247</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Daily Average</p>
                    <p className="text-3xl font-bold text-green-600">42</p>
                    <p className="text-sm text-green-600">+8% increase</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Peak Day</p>
                    <p className="text-3xl font-bold text-purple-600">Friday</p>
                    <p className="text-sm text-gray-500">52 visitors</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Popular Dept.</p>
                    <p className="text-3xl font-bold text-orange-600">Economic</p>
                    <p className="text-sm text-gray-500">32% of visits</p>
                  </div>
                  <Building className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Visitors Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Visitor Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Visitors by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentVisitors}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="visitors"
                      label={({ name, percentage }) => `${percentage}%`}
                    >
                      {departmentVisitors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {departmentVisitors.map((dept, index) => (
                    <div key={dept.department} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: pieColors[index] }}
                        />
                        <span className="text-sm">{dept.department}</span>
                      </div>
                      <span className="text-sm font-medium">{dept.visitors}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Visitor Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Visitors Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Company</th>
                      <th className="text-left p-2">Department</th>
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisitors.map((visitor, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{visitor.name}</td>
                        <td className="p-2">{visitor.company}</td>
                        <td className="p-2">{visitor.department}</td>
                        <td className="p-2">{visitor.time}</td>
                        <td className="p-2">
                          <Badge 
                            variant={visitor.status === 'Inside' ? 'default' : 'secondary'}
                            className={visitor.status === 'Inside' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {visitor.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
