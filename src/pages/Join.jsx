import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Brain, Database, Sprout, Users, Heart } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Join = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('User signed up with:', { email, password });
    navigate('/gift');
  };

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
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
                  <p className="text-teal-700">Harness the power of AI to enhance your decision-making, allowing you to navigate complex permaculture challenges with confidence and clarity.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Database className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-teal-800">Unlock Data-Driven Insights</h3>
                  <p className="text-teal-700">Transform raw information into actionable strategies, giving you the leverage to make informed decisions and optimize your permaculture practices.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Sprout className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-teal-800">Pioneer the Regenerative Renaissance</h3>
                  <p className="text-teal-700">Be at the forefront of a global movement, contributing to and benefiting from innovative practices that heal our planet and nourish communities.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-teal-800">Collaborate with Visionaries</h3>
                  <p className="text-teal-700">Connect with a global network of permaculture experts and innovators, fostering deep relationships and collaborative problem-solving.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Heart className="h-6 w-6 mr-4 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-teal-800">Fulfill Your Deepest Aspirations</h3>
                  <p className="text-teal-700">Oosh provides a safe space to express and pursue your most profound desires for a sustainable, harmonious world. Here, your vision for positive change finds support and amplification.</p>
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
                Oosh is more than a platform—it's a catalyst for the regenerative renaissance. We're revolutionizing how permaculture enthusiasts collaborate, innovate, and drive sustainable change by leveraging the human spirit and systems innovation to serve humanity's deepest needs.
              </p>
              <p className="mb-4 text-teal-700">
                By joining Oosh, you're not just gaining access to tools—you're becoming part of a movement that's reshaping our approach to agriculture, sustainability, and human flourishing. Your involvement is crucial in our collective journey towards a regenerative future where everyone's needs are met in harmony with the planet.
              </p>
              <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-teal-300 focus:ring-teal-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-teal-300 focus:ring-teal-500"
                />
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Gain Access & Pioneer the Future of Permaculture
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Join;
