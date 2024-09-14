import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const DonationForm = ({ onComplete }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with Stripe for payment processing
    console.log('Processing donation of $', amount);
    onComplete();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Donation Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              step="1"
              required
            />
          </div>
          <div id="stripe-element">
            {/* Stripe Elements will be inserted here */}
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            Complete Donation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;