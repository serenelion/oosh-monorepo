import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Search, Sprout } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Link } from 'react-router-dom';

const Oosh = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Volunteer', 'Online Training', 'Job', 'Investment', 'Live Event'];

  useEffect(() => {
    // Simulated data for demonstration
    const placeholderOpportunities = [
      {
        id: 1,
        title: "Volunteer at Sunshine Organic Farm",
        category: "Volunteer",
        location: "California, USA",
        description: "Join us for a week of hands-on experience in organic farming techniques.",
        startDate: "2024-06-01",
        endDate: "2024-06-07"
      },
      {
        id: 2,
        title: "Permaculture Design Course",
        category: "Online Training",
        location: "Virtual",
        description: "Comprehensive online course covering permaculture principles and design strategies.",
        startDate: "2024-07-15",
        endDate: "2024-08-30"
      },
      {
        id: 3,
        title: "Sustainable Agriculture Internship",
        category: "Job",
        location: "Vermont, USA",
        description: "6-month paid internship focused on sustainable farming practices and community engagement.",
        startDate: "2024-05-01",
        endDate: "2024-10-31"
      },
      {
        id: 4,
        title: "Eco-Lodge Investment Opportunity",
        category: "Investment",
        location: "Costa Rica",
        description: "Seeking investors for an eco-lodge project integrating permaculture principles.",
        startDate: "2024-09-01",
        endDate: "2025-09-01"
      },
      {
        id: 5,
        title: "Urban Gardening Workshop",
        category: "Live Event",
        location: "New York City, USA",
        description: "One-day workshop on maximizing food production in urban environments.",
        startDate: "2024-08-15",
        endDate: "2024-08-15"
      }
    ];

    setOpportunities(placeholderOpportunities);

    // Commented out API integration code
    /*
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('https://sea-turtle-app-4in2t.ondigitalocean.app/api/opportunities');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      }
    };

    fetchOpportunities();
    */
  }, []);

  const filteredOpportunities = opportunities.filter(opp => 
    (selectedCategory === 'All' || opp.category === selectedCategory) &&
    (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-teal-800 text-center flex items-center justify-center">
          <Leaf className="mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600" />
          Oosh: Permaculture Opportunities Hub
        </h1>
        
        <Card className="mb-6 sm:mb-8 shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-xl sm:text-2xl text-teal-700 flex items-center">
              <Sprout className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Opportunities
            </CardTitle>
            <Link to="/create">
              <Button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white">
                Create New Opportunity
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category
                      ? "bg-teal-500 text-white"
                      : "text-teal-700 border-teal-300 hover:bg-teal-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="text"
                placeholder="Search opportunities..."
                className="flex-grow border-teal-300 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px]">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="mb-4 hover:bg-teal-50 transition-colors">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-teal-700">{opportunity.title}</h3>
                    <p className="text-sm text-teal-600">{opportunity.category} • {opportunity.location}</p>
                    <p className="text-teal-700 mt-2">{opportunity.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-teal-600">
                        {new Date(opportunity.startDate).toLocaleDateString()} - {new Date(opportunity.endDate).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline" className="text-teal-600 border-teal-300 hover:bg-teal-50">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredOpportunities.length === 0 && (
                <p className="text-center text-teal-600 mt-4">No opportunities found. Be the first to create one!</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Oosh;
