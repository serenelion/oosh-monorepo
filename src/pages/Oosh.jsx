import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Search, Sprout } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CreateOpportunityDialog from '@/components/CreateOpportunityDialog';
import FlowerOfLife from '@/components/FlowerOfLife';

const Oosh = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateOpportunity = (newOpportunity) => {
    setOpportunities([newOpportunity, ...opportunities]);
  };

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-teal-800 text-center flex items-center justify-center">
          <Leaf className="mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600" />
          Oosh: Permaculture Opportunities Hub
        </h1>
        
        <Card className="mb-6 sm:mb-8 shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200 relative overflow-hidden">
          <FlowerOfLife />
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 relative z-10">
            <CardTitle className="text-xl sm:text-2xl text-teal-700 flex items-center">
              <Sprout className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Opportunities
            </CardTitle>
            <CreateOpportunityDialog onCreateOpportunity={handleCreateOpportunity} />
          </CardHeader>
          <CardContent className="relative z-10">
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
            <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              {filteredOpportunities.map((opportunity, index) => (
                <Card key={index} className="mb-4 hover:bg-teal-50 transition-colors">
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
