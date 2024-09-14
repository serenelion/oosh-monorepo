import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Leaf, ArrowRight, Gift, Network } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center flex items-center justify-center">
        <Leaf className="mr-2 h-8 w-8 text-teal-600" />
        Join the Oosh Network
      </h1>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Empower Your Permaculture Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <MessageSquare className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">AI-Powered Insights</h3>
                <p className="text-teal-700">Gain access to our advanced AI assistants for personalized permaculture advice, helping you make informed decisions for your projects.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Connect with Experts</h3>
                <p className="text-teal-700">Network with experienced permaculture practitioners and enthusiasts, fostering a community of knowledge sharing and collaboration.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Leaf className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Sustainable Solutions</h3>
                <p className="text-teal-700">Discover innovative approaches to create thriving, sustainable ecosystems, tailored to your specific environment and goals.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Gift className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Contribute to Growth</h3>
                <p className="text-teal-700">After signing up, you'll have the opportunity to support Oosh's evolution through a financial gift, directly impacting the development of new features and resources.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Network className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Expand the Network</h3>
                <p className="text-teal-700">Help grow our community by inviting friends and colleagues to join Oosh, creating a ripple effect of sustainable knowledge and practices.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">About Oosh: A Movement for Sustainable Change</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-teal-700">
              Oosh is more than just a platform—it's an open-source project in the Movement Creator Ecosystem, developed with a 'gift' model to enhance the productivity of social enterprise creators in the permaculture space.
            </p>
            <p className="mb-4 text-teal-700">
              By joining our network, you're becoming part of a movement dedicated to creating positive change through sustainable practices. Your involvement goes beyond access to tools and connections—it's about contributing to a global shift towards regenerative living.
            </p>
            <p className="mb-6 text-teal-700">
              After signing up, you'll be invited to play a crucial role in Oosh's growth:
            </p>
            <ul className="list-disc list-inside mb-6 text-teal-700">
              <li>Choose a financial gift that feels right for you, supporting the ongoing development of Oosh</li>
              <li>Invite friends and colleagues to join, expanding our network of changemakers</li>
              <li>Engage with our community, sharing your knowledge and learning from others</li>
            </ul>
            <Button onClick={() => navigate('/auth')} className="bg-teal-500 hover:bg-teal-600 text-white w-full">
              Join Oosh & Be Part of the Change
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;
