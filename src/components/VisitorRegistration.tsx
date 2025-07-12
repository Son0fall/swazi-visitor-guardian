
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { X, User, Phone, Clock, Building, FileText, UserCheck } from 'lucide-react';

interface VisitorRegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const VisitorRegistration: React.FC<VisitorRegistrationProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    idNumber: '',
    company: '',
    purpose: '',
    personToVisit: '',
    department: '',
    floor: '',
    expectedDuration: '',
    items: '',
    vehicleReg: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    { name: 'Economic Planning', floor: 1 },
    { name: 'Development Finance', floor: 2 },
    { name: 'Policy Analysis', floor: 3 },
    { name: 'Public Service', floor: 4 },
    { name: 'Ministry of Finance', floor: 5 },
    { name: 'Administration', floor: 6 }
  ];

  const handleDepartmentChange = (deptName: string) => {
    const selectedDept = departments.find(d => d.name === deptName);
    setFormData({
      ...formData,
      department: deptName,
      floor: selectedDept ? selectedDept.floor.toString() : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const visitorData = {
        ...formData,
        registrationTime: new Date().toISOString(),
        status: 'active',
        registrationCode: `REG${Date.now().toString().slice(-6)}`
      };

      // Store in localStorage (in real app, this would be sent to backend)
      const existingVisitors = JSON.parse(localStorage.getItem('visitors') || '[]');
      existingVisitors.push(visitorData);
      localStorage.setItem('visitors', JSON.stringify(existingVisitors));

      toast({
        title: "Visitor Registered Successfully",
        description: `Registration Code: ${visitorData.registrationCode}`,
      });

      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl">Visitor Registration</CardTitle>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              REG1.3.4
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Personal Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    placeholder="Enter ID number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Visit Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Visit Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="personToVisit">Person to Visit *</Label>
                  <Input
                    id="personToVisit"
                    value={formData.personToVisit}
                    onChange={(e) => setFormData({...formData, personToVisit: e.target.value})}
                    placeholder="Enter name of person to visit"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.name} value={dept.name}>
                        {dept.name} (Floor {dept.floor})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    value={formData.floor}
                    readOnly
                    className="bg-gray-50"
                    placeholder="Auto-selected based on department"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDuration">Expected Duration *</Label>
                  <select
                    id="expectedDuration"
                    value={formData.expectedDuration}
                    onChange={(e) => setFormData({...formData, expectedDuration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="Half day">Half day</option>
                    <option value="Full day">Full day</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleReg">Vehicle Registration</Label>
                  <Input
                    id="vehicleReg"
                    value={formData.vehicleReg}
                    onChange={(e) => setFormData({...formData, vehicleReg: e.target.value})}
                    placeholder="Enter vehicle registration number"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Additional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Visit *</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    placeholder="Describe the purpose of your visit"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items">Items/Devices Carried</Label>
                  <Textarea
                    id="items"
                    value={formData.items}
                    onChange={(e) => setFormData({...formData, items: e.target.value})}
                    placeholder="List any laptops, cameras, or other items"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register Visitor'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorRegistration;
