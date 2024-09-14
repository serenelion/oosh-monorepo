import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const GiftSelection = ({ onSelect }) => {
  const [selectedGift, setSelectedGift] = useState(null);

  const gifts = [
    { id: 'time', label: 'Volunteer 2 hours per week' },
    { id: 'skills', label: 'Share a skill or expertise' },
    { id: 'donation', label: 'Make a small donation' },
  ];

  const handleSelect = () => {
    if (selectedGift) {
      onSelect(selectedGift);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Choose Your Gift</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-center">As part of joining our network, please select a one-time gift you'd like to contribute:</p>
        <RadioGroup onValueChange={setSelectedGift} className="space-y-2">
          {gifts.map((gift) => (
            <div key={gift.id} className="flex items-center space-x-2">
              <RadioGroupItem value={gift.id} id={gift.id} />
              <Label htmlFor={gift.id}>{gift.label}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleSelect} className="w-full mt-4" disabled={!selectedGift}>
          Confirm Gift
        </Button>
      </CardContent>
    </Card>
  );
};

export default GiftSelection;