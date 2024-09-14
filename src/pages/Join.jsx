import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Save, Users } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center">Join the Network</h1>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Benefits of Joining</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Save className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg">Save Your Chat Records</h3>
                <p>Keep track of all your conversations and insights for future reference.</p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageSquare className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg">Connect with Other Social Enterprise Creators</h3>
                <p>Find and chat with like-minded individuals who are also working on impactful projects.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 mr-4 text-teal-600" />
              <div>
                <h3 className="font-semibold text-lg">Get Personalized Recommendations</h3>
                <p>Receive suggestions for people to connect with based on your interests and goals.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">About Oosh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Oosh is an open-source project in the Movement Creator Ecosystem that is being experimentally developed with a 'gift' model to improve the productivity of social enterprise creators.
            </p>
            <p className="mb-4">
              By joining our network, you're not just gaining access to powerful tools and connections - you're becoming part of a movement dedicated to creating positive change in the world.
            </p>
            <Button onClick={() => navigate('/auth')} className="bg-teal-500 hover:bg-teal-600 text-white">
              Create a Farm Enterprise Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;