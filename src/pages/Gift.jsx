import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, ArrowRight, Leaf } from 'lucide-react';

const GiftPage = () => {
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
            <Leaf className="mr-2 h-6 w-6" />
            Welcome to Oosh!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-teal-700 font-semibold text-center">
            You're now part of a vibrant community dedicated to regenerative practices!
          </p>
          <p className="text-teal-600 text-center">
            We're thrilled to have you on board. Let's start by choosing a gift that resonates with you and supports our shared vision for a sustainable future.
          </p>
          <p className="text-teal-700 font-semibold text-center">
            Your contribution fuels our collective journey towards regenerative innovation!
          </p>
          <p className="text-teal-600 text-sm text-center">
            Every gift, no matter the size, makes a significant impact. Choose an amount that feels right for you:
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[10, 25, 50, 100].map((amount) => (
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
              Gift
            </Button>
          </div>
          <Button onClick={handleSkipGift} className="w-full bg-gray-200 hover:bg-gray-300 text-teal-700">
            Join without gifting
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-teal-600 text-xs text-center">
            Your gift supports Oosh's mission to advance permaculture and sustainable practices worldwide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GiftPage;
