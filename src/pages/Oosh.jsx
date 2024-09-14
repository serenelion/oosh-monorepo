import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Search, Sprout, MapPin, Calendar, User } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Link } from 'react-router-dom';

const categories = ['All', 'Volunteer', 'Online Training', 'Job', 'Investment', 'Live Event'];

const OpportunityCard = ({ opportunity }) => (
  <Card key={opportunity.id} className="mb-4 hover:bg-teal-50 transition-colors">
    <CardContent className="p-4">
      <Link to={`/opportunity/${opportunity.id}`} className="hover:underline">
        <h3 className="font-semibold text-lg text-teal-700">{opportunity.title}</h3>
      </Link>
      <div className="flex items-center text-sm text-teal-600 mb-2">
        <Sprout className="h-4 w-4 mr-1" />
        <span>{opportunity.category}</span>
        <MapPin className="h-4 w-4 ml-2 mr-1" />
        <span>{opportunity.location}</span>
      </div>
      <p className="text-teal-700 mb-2">{opportunity.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-teal-600" />
          <span className="text-sm text-teal-600">
            {new Date(opportunity.startDate).toLocaleDateString()} - {new Date(opportunity.endDate).toLocaleDateString()}
          </span>
        </div>
        {opportunity.postedBy && (
          <Link to={`/farm-profile/${opportunity.postedBy.id}`} className="flex items-center text-sm text-teal-600 hover:underline">
            <User className="h-4 w-4 mr-1" />
            <span>{opportunity.postedBy.name}</span>
          </Link>
        )}
      </div>
    </CardContent>
  </Card>
);

const Oosh = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchOpportunities = async () => {
      // Simulated API call
      const placeholderOpportunities = [
        {
          id: 1,
          title: "Volunteer at Sunshine Organic Farm",
          category: "Volunteer",
          location: "California, USA",
          description: "Join us for a week of hands-on experience in organic farming techniques.",
          startDate: "2024-06-01",
          endDate: "2024-06-07",
          postedBy: { id: "user123", name: "John Doe" },
        },
        {
          id: 2,
          title: "Permaculture Design Course",
          category: "Online Training",
          location: "Virtual",
          description: "Comprehensive online course covering permaculture principles and design strategies.",
          startDate: "2024-07-15",
          endDate: "2024-08-30",
          postedBy: { id: "user456", name: "Jane Smith" },
        },
        // Add more placeholder opportunities as needed
      ];
      setOpportunities(placeholderOpportunities);
    };

    fetchOpportunities();
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
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
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
