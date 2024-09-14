import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Leaf, ArrowRight, Gift, Network, Database, Brain, Sprout } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 text-center flex items-center justify-center">
        <Leaf className="mr-2 h-8 w-8 text-teal-600" />
        Gain Access to the Oosh Network
      </h1>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Advance Your Permaculture Enterprises</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <Brain className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Augment Your Intelligence</h3>
                <p className="text-teal-700">Leverage our AI-powered assistants to enhance your decision-making and problem-solving capabilities in permaculture projects.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Database className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Unlock Data-Driven Insights</h3>
                <p className="text-teal-700">Gain more leverage with your data, transforming raw information into actionable strategies for sustainable farm management.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sprout className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Pioneer the Regenerative Renaissance</h3>
                <p className="text-teal-700">Be at the forefront of the sustainable agriculture movement, contributing to and benefiting from cutting-edge permaculture practices.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Collaborate with Visionaries</h3>
                <p className="text-teal-700">Connect with a global network of permaculture experts and innovators, fostering knowledge exchange and collaborative problem-solving.</p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageSquare className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-teal-800">Access Collective Wisdom</h3>
                <p className="text-teal-700">Tap into the collective intelligence of the permaculture community, gaining insights from diverse experiences and innovative approaches.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Oosh: Catalyzing Sustainable Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-teal-700">
              Oosh is more than a platform—it's a catalyst for the regenerative renaissance. As an open-source project within the Movement Creator Ecosystem, we're revolutionizing how permaculture enthusiasts collaborate, innovate, and drive sustainable change.
            </p>
            <p className="mb-4 text-teal-700">
              By joining Oosh, you're not just gaining access to tools—you're becoming part of a movement that's reshaping our approach to agriculture and sustainability. Your involvement is crucial in our collective journey towards a regenerative future.
            </p>
            <p className="mb-6 text-teal-700 font-semibold">
              After signing up, you'll be invited to play a pivotal role in Oosh's evolution:
            </p>
            <ul className="list-disc list-inside mb-6 text-teal-700">
              <li>Contribute financially to fuel Oosh's development and expand our capabilities</li>
              <li>Amplify our impact by inviting fellow innovators to join the network</li>
              <li>Shape the future of permaculture by sharing your unique insights and experiences</li>
            </ul>
            <p className="mb-6 text-teal-700">
              Your participation goes beyond mere membership—it's an investment in a sustainable future and an opportunity to be at the forefront of the permaculture revolution.
            </p>
            <Button onClick={() => navigate('/auth')} className="bg-teal-500 hover:bg-teal-600 text-white w-full">
              Join Oosh & Pioneer the Future of Permaculture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;
