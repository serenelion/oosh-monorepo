import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from 'lucide-react';

const DonationForm = ({ onComplete }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with Stripe for payment processing
    console.log('Processing donation of $', amount);
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
      <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm shadow-xl border-teal-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-teal-700 flex items-center justify-center">
            <Leaf className="mr-2 h-6 w-6 text-teal-500" />
            Gift to Oosh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-teal-700">Gift Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="1"
                required
                className="border-teal-300 focus:ring-teal-500"
              />
            </div>
            <div id="stripe-element" className="bg-gray-100 p-4 rounded-md">
              {/* Stripe Elements will be inserted here */}
              <p className="text-gray-500 text-sm text-center">Secure payment powered by Stripe</p>
            </div>
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
              Complete Gift & Join Oosh
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationForm;
