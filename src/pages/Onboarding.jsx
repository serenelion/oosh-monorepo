import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/gift');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-90 backdrop-blur-sm border-teal-200">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-700 flex items-center justify-center">
            <Gift className="mr-2 h-6 w-6" />
            Welcome to Oosh!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-teal-700 font-semibold text-center">
            You're now part of a vibrant community dedicated to regenerative practices!
          </p>
          <p className="text-teal-600 text-center">
            We're thrilled to have you on board. Your next step is to choose a gift that resonates with you and supports our shared vision.
          </p>
          <Button onClick={handleContinue} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            Choose Your Gift
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
