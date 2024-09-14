import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, Calendar, Edit } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const OpportunityView = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);

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
        description: "Join us for a week of hands-on experience in organic farming techniques. You'll learn about sustainable agriculture practices, work with our team, and contribute to our mission of producing healthy, organic food for the local community.",
        startDate: "2024-06-01",
        endDate: "2024-06-07",
        postedBy: {
          id: "user123",
          name: "John Doe",
        },
      });
    };

    fetchOpportunity();
  }, [id]);

  if (!opportunity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Card className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-lg border-teal-200">
          <CardHeader className="border-b border-teal-100">
            <CardTitle className="text-2xl font-bold text-teal-800 flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-teal-600" />
              {opportunity.title}
            </CardTitle>
            <div className="flex items-center text-teal-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{opportunity.location}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-teal-800 mb-2">Description</h3>
              <p className="text-teal-700">{opportunity.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-teal-600" />
              <span className="text-teal-700">
                {new Date(opportunity.startDate).toLocaleDateString()} - {new Date(opportunity.endDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-teal-800 mb-2">Posted By</h3>
              <Link to={`/farm-profile/${opportunity.postedBy.id}`} className="text-teal-600 hover:underline">
                {opportunity.postedBy.name}
              </Link>
            </div>
            <Link to={`/opportunity/${id}/edit`}>
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                <Edit className="mr-2 h-4 w-4" />
                Edit Opportunity
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityView;