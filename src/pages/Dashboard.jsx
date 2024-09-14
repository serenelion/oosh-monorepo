import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const [chatRecords, setChatRecords] = useState([
    { id: 1, title: 'Permaculture Design', date: '2023-03-15' },
    { id: 2, title: 'Sustainable Farming Techniques', date: '2023-03-18' },
  ]);

  const [networkMembers, setNetworkMembers] = useState([
    { id: 1, name: 'Alice Green', expertise: 'Agroforestry' },
    { id: 2, name: 'Bob Waters', expertise: 'Aquaponics' },
  ]);

  const [recommendations, setRecommendations] = useState([
    { id: 1, name: 'Carol Earth', expertise: 'Soil Regeneration' },
    { id: 2, name: 'David Sun', expertise: 'Solar Integration' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              Saved Chat Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {chatRecords.map((record) => (
                <div key={record.id} className="mb-4 p-2 bg-white rounded shadow">
                  <h3 className="font-semibold">{record.title}</h3>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Network Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {networkMembers.map((member) => (
                <div key={member.id} className="mb-4 p-2 bg-white rounded shadow">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.expertise}</p>
                  <Button variant="outline" size="sm" className="mt-2">Chat</Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2" />
              Recommended Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="mb-4 p-2 bg-white rounded shadow">
                  <h3 className="font-semibold">{recommendation.name}</h3>
                  <p className="text-sm text-gray-500">{recommendation.expertise}</p>
                  <Button variant="outline" size="sm" className="mt-2">Connect</Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;