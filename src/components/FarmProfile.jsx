import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, Users, Milk, ShoppingBag } from 'lucide-react';

const FarmProfile = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm shadow-lg border-teal-200">
      <CardHeader className="border-b border-teal-100">
        <CardTitle className="text-2xl font-bold text-teal-800 flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-teal-600" />
          Finca Aluna
        </CardTitle>
        <div className="flex items-center text-teal-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Ometepe Island, Nicaragua</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-teal-600" />
            <span className="font-semibold">Jonathan & Josie</span>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Connect
          </Button>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-teal-800 mb-2">About Our Farm</h3>
          <p className="text-teal-700">
            Finca Aluna is a beyond organic permaculture farm integrating holistic management with cows, pigs, chickens, worms, and larva. We're pioneering new ways of sustainable farming using syntropic principles.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-teal-800 mb-2">Current Opportunities</h3>
          <ul className="list-disc list-inside text-teal-700 space-y-2">
            <li>Seeking a greenhouse manager to live on the farm</li>
            <li>Looking for passionate individuals to help grow our farm over the next 10+ years</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-teal-800 mb-2">Products Available</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Milk className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-teal-700">Raw or pasteurized milk</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-teal-700">Homemade yogurt</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-teal-600">
            70 cordobas for a liter of milk. Special price available for a gallon.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-teal-800 mb-2">Our Values</h3>
          <ul className="list-disc list-inside text-teal-700 space-y-2">
            <li>Family-oriented</li>
            <li>Health-conscious</li>
            <li>Freedom-loving</li>
            <li>Ethical animal treatment (e.g., calves spend nights with their mothers)</li>
          </ul>
        </div>

        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
          Contact Finca Aluna
        </Button>
      </CardContent>
    </Card>
  );
};

export default FarmProfile;