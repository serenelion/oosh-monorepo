import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Search, Users, Calendar, BookOpen, Sprout } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import FarmProfile from '@/components/FarmProfile';

const Oosh = () => {
  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center flex items-center justify-center">
          <Leaf className="mr-2 h-8 w-8 text-teal-600" />
          Oosh: Permaculture Community Hub
        </h1>
        
        <FarmProfile />
        
        <Card className="mt-8 shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Discover Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Search opportunities..."
                className="flex-grow mr-2 border-teal-300 focus:ring-teal-500"
              />
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ScrollArea className="h-64">
                  <Card className="mb-4 hover:bg-teal-50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-teal-700">Greenhouse Manager Needed</h3>
                      <p className="text-sm text-teal-600">Job • Finca Aluna, Ometepe Island, Nicaragua</p>
                    </CardContent>
                  </Card>
                  <Card className="mb-4 hover:bg-teal-50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-teal-700">Permaculture Design Course</h3>
                      <p className="text-sm text-teal-600">Education • Online</p>
                    </CardContent>
                  </Card>
                  <Card className="mb-4 hover:bg-teal-50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-teal-700">Community Garden Project</h3>
                      <p className="text-sm text-teal-600">Volunteer • Various Locations</p>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
            <CardHeader>
              <CardTitle className="text-xl text-teal-700 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Connect with the Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-600 mb-4">Join discussions, share ideas, and collaborate with like-minded individuals passionate about permaculture.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Explore Community</Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
            <CardHeader>
              <CardTitle className="text-xl text-teal-700 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-600 mb-4">Discover workshops, webinars, and meetups focused on sustainable living and permaculture practices.</p>
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">View Events</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Oosh;
