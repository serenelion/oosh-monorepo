import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Leaf, ArrowRight, Gift, Network, Database, Brain, Sprout, Heart } from 'lucide-react';

const Join = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showGiftPrompt, setShowGiftPrompt] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    console.log('User signed up with:', { email, password });
    setShowGiftPrompt(true);
  };

  const handleGift = (amount) => {
    // TODO: Implement gift processing logic
    console.log(`Processing optional gift of $${amount}`);
    navigate('/dashboard');
  };

  const handleSkipGift = () => {
    console.log('User skipped gift');
    navigate('/dashboard');
  };

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
            <p className="mb-6 text-teal-700 font-semibold">
              As an early adopter, you have a unique opportunity to shape the future of Oosh:
            </p>
            <ul className="list-disc list-inside mb-6 text-teal-700">
              <li>Contribute to our crowd-funding initiative to fuel Oosh's development and expand our capabilities</li>
              <li>Amplify our impact by inviting fellow innovators to join the network</li>
              <li>Shape the future of permaculture by sharing your unique insights and experiences</li>
              <li>Participate in co-creating solutions that address our collective challenges</li>
            </ul>
            <p className="mb-6 text-teal-700">
              Your participation goes beyond mere membership—it's an investment in a sustainable future and an opportunity to be at the forefront of a global transformation in how we live, work, and thrive together.
            </p>
            {!showGiftPrompt ? (
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
            ) : (
              <div className="space-y-4">
                <p className="text-teal-700 font-semibold">Your gift to support Oosh's development is appreciated but optional:</p>
                <p className="text-teal-600 text-sm">
                  Guidelines for choosing an amount:
                  <br />• Consider your perception of Oosh's value to you and the community
                  <br />• Give within your means - any amount is welcome
                  <br />• Your contribution fuels our shared vision for a regenerative future
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[10, 100, 1000, 10000].map((amount) => (
                    <Button key={amount} onClick={() => handleGift(amount)} className="bg-teal-500 hover:bg-teal-600 text-white">
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={() => handleGift(customAmount)} className="bg-teal-500 hover:bg-teal-600 text-white">
                    Gift Custom Amount
                  </Button>
                </div>
                <Button onClick={handleSkipGift} className="w-full bg-gray-200 hover:bg-gray-300 text-teal-700">
                  Skip Gift & Continue to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;
