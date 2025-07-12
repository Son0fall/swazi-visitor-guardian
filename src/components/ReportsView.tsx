
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  Users, 
  Clock,
  Building2
} from 'lucide-react';

const ReportsView = () => {
  const [reportPeriod, setReportPeriod] = useState('weekly');
  const [reportData, setReportData] = useState({
    weeklyVisitors: [],
    departmentVisits: [],
    monthlyTrends: [],
    summary: {
      totalVisitors: 156,
      averageDaily: 22,
      peakHour: '10:00 AM',
      topDepartment: 'Policy Analysis'
    }
  });

  useEffect(() => {
    // Generate sample data for charts
    const weeklyData = [
      { day: 'Mon', visitors: 18 },
      { day: 'Tue', visitors: 25 },
      { day: 'Wed', visitors: 32 },
      { day: 'Thu', visitors: 28 },
      { day: 'Fri', visitors: 35 },
      { day: 'Sat', visitors: 12 },
      { day: 'Sun', visitors: 6 }
    ];

    const departmentData = [
      { name: 'Policy Analysis', visits: 42, color: '#8884d8' },
      { name: 'Economic Planning', visits: 35, color: '#82ca9d' },
      { name: 'Development Finance', visits: 28, color: '#ffc658' },
      { name: 'Public Service', visits: 22, color: '#ff7300' },
      { name: 'Ministry of Finance', visits: 18, color: '#00ff00' },
      { name: 'Administration', visits: 11, color: '#ff0000' }
    ];

    const monthlyData = [
      { month: 'Jan', visitors: 124 },
      { month: 'Feb', visitors: 142 },
      { month: 'Mar', visitors: 156 },
      { month: 'Apr', visitors: 178 },
      { month: 'May', visitors: 165 }
    ];

    setReportData({
      weeklyVisitors: weeklyData,
      departmentVisits: departmentData,
      monthlyTrends: monthlyData,
      summary: {
        totalVisitors: 156,
        averageDaily: 22,
        peakHour: '10:00 AM',
        topDepartment: 'Policy Analysis'
      }
    });
  }, [reportPeriod]);

  const generateReport = () => {
    // In a real application, this would generate and download a PDF report
    const reportContent = {
      period: reportPeriod,
      generated: new Date().toISOString(),
      data: reportData
    };
    
    console.log('Generating report:', reportContent);
    // Here you would typically call an API to generate a PDF report
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Ministry visitor statistics and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
          </select>
          <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-3xl font-bold text-blue-600">{reportData.summary.totalVisitors}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last period</p>
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
                <p className="text-3xl font-bold text-green-600">{reportData.summary.averageDaily}</p>
                <p className="text-xs text-green-600 mt-1">+8% from last period</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                <p className="text-3xl font-bold text-orange-600">{reportData.summary.peakHour}</p>
                <p className="text-xs text-gray-500 mt-1">Busiest time</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Department</p>
                <p className="text-lg font-bold text-purple-600">{reportData.summary.topDepartment}</p>
                <p className="text-xs text-gray-500 mt-1">Most visited</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visitors Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Daily Visitor Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.weeklyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Visits Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Visits by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.departmentVisits}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                    >
                      {reportData.departmentVisits.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Visitor Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Floor</th>
                  <th className="text-right py-3 px-4">This Week</th>
                  <th className="text-right py-3 px-4">This Month</th>
                  <th className="text-right py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {reportData.departmentVisits.map((dept, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="py-3 px-4">Floor {index + 1}</td>
                    <td className="py-3 px-4 text-right">{dept.visits}</td>
                    <td className="py-3 px-4 text-right">{Math.floor(dept.visits * 3.2)}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        +{Math.floor(Math.random() * 15 + 5)}%
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
  );
};

export default ReportsView;
