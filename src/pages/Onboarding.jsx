import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [customAmount, setCustomAmount] = useState('');

  const handleGift = (amount) => {
    // TODO: Implement gift processing logic
    console.log(`Processing gift of $${amount}`);
    navigate('/dashboard');
  };

  const handleSkipGift = () => {
    console.log('User skipped gift');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 flex items-center justify-center">
            <Gift className="mr-2 h-6 w-6" />
            Choose Your Gift
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;