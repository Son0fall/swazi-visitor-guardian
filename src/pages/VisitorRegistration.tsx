
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, UserPlus, Save } from 'lucide-react';

const VisitorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    company: '',
    department: '',
    purposeOfVisit: '',
    personToMeet: '',
    itemsBrought: '',
    vehicleRegistration: ''
  });

  const departments = [
    'Economic Planning Division',
    'Development Finance Unit', 
    'Policy Analysis Department',
    'Public Investment Division',
    'Strategic Planning Unit',
    'Administration Office',
    'Human Resources',
    'Information Technology'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate visitor badge number
    const badgeNumber = `MEPD-${Date.now().toString().slice(-6)}`;
    
    // Save to localStorage (in real app, this would go to database)
    const visitor = {
      ...formData,
      badgeNumber,
      checkInTime: new Date().toISOString(),
      status: 'checked-in'
    };
    
    const existingVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    existingVisitors.push(visitor);
    localStorage.setItem('visitors', JSON.stringify(existingVisitors));

    toast({
      title: "Visitor Registered Successfully",
      description: `Badge Number: ${badgeNumber}`,
    });

    // Reset form
    setFormData({
      fullName: '',
      idNumber: '',
      phoneNumber: '',
      email: '',
      company: '',
      department: '',
      purposeOfVisit: '',
      personToMeet: '',
      itemsBrought: '',
      vehicleRegistration: ''
    });
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
              <h1 className="text-xl font-bold">Visitor Registration</h1>
              <p className="text-sm text-gray-600">Register new visitor to MEPD</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                New Visitor Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      placeholder="Enter ID number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department to Visit *</Label>
                    <Select onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Visit Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="personToMeet">Person to Meet</Label>
                    <Input
                      id="personToMeet"
                      value={formData.personToMeet}
                      onChange={(e) => handleInputChange('personToMeet', e.target.value)}
                      placeholder="Enter person's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
                    <Input
                      id="vehicleRegistration"
                      value={formData.vehicleRegistration}
                      onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
                      placeholder="Enter vehicle registration"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purposeOfVisit">Purpose of Visit *</Label>
                  <Textarea
                    id="purposeOfVisit"
                    value={formData.purposeOfVisit}
                    onChange={(e) => handleInputChange('purposeOfVisit', e.target.value)}
                    placeholder="Describe the purpose of visit"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemsBrought">Items/Devices Brought</Label>
                  <Textarea
                    id="itemsBrought"
                    value={formData.itemsBrought}
                    onChange={(e) => handleInputChange('itemsBrought', e.target.value)}
                    placeholder="List any items, devices, or equipment brought"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Register Visitor
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VisitorRegistration;
