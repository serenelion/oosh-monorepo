import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Leaf, Save } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const OpportunityEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Simulated data fetch
    const fetchOpportunity = async () => {
      // Simulated API call
      // const response = await fetch(`https://sea-turtle-app-4in2t.ondigitalocean.app/api/opportunities/${id}`);
      // const data = await response.json();
      // setOpportunity(data);

      // Simulated data for demonstration
      setOpportunity({
        id: id,
        title: "Volunteer at Sunshine Organic Farm",
        category: "Volunteer",
        location: "California, USA",
        description: "Join us for a week of hands-on experience in organic farming techniques.",
        startDate: "2024-06-01",
        endDate: "2024-06-07",
      });
    };

    fetchOpportunity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulated API call
    // await fetch(`https://sea-turtle-app-4in2t.ondigitalocean.app/api/opportunities/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(opportunity),
    // });
    console.log('Updated opportunity:', opportunity);
    navigate(`/opportunity/${id}`);
  };

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Card className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-lg border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-800 flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-teal-600" />
              Edit Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={opportunity.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={opportunity.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={opportunity.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={opportunity.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={opportunity.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={opportunity.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityEdit;