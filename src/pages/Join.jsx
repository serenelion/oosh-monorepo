import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Leaf, ArrowRight } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center flex items-center justify-center">
        <Leaf className="mr-2 h-8 w-8 text-teal-600" />
        Join the Oosh Network
      </h1>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Benefits of Joining</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <MessageSquare className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">AI-Powered Insights</h3>
                <p className="text-teal-700">Gain access to our advanced AI assistants for personalized permaculture advice.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Connect with Experts</h3>
                <p className="text-teal-700">Network with experienced permaculture practitioners and enthusiasts.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Leaf className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Sustainable Solutions</h3>
                <p className="text-teal-700">Discover innovative approaches to create thriving, sustainable ecosystems.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">About Oosh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-teal-700">
              Oosh is an open-source project in the Movement Creator Ecosystem, developed with a 'gift' model to enhance the productivity of social enterprise creators in the permaculture space.
            </p>
            <p className="mb-6 text-teal-700">
              By joining our network, you're not just gaining access to powerful tools and connections - you're becoming part of a movement dedicated to creating positive change through sustainable practices.
            </p>
            <Button onClick={() => navigate('/auth')} className="bg-teal-500 hover:bg-teal-600 text-white w-full">
              Create Your Oosh Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;
