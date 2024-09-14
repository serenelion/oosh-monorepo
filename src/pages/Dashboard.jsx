import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, UserPlus, Leaf, Settings } from 'lucide-react';
import AIAssistantChat from '../components/AIAssistantChat';
import CreateAssistantDialog from '../components/CreateAssistantDialog';

const AIAssistant = ({ name, icon, onChat, onConfigure }) => (
  <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="flex items-center justify-between text-teal-700">
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{name}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onConfigure}>
          <Settings className="h-4 w-4" />
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={onChat} className="w-full bg-teal-500 hover:bg-teal-600 text-white">Chat Now</Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [assistants, setAssistants] = useState([
    { id: 1, name: 'People Connector', icon: <Users className="h-6 w-6 text-teal-600" /> },
    { id: 2, name: 'Farmer Friend', icon: <MessageSquare className="h-6 w-6 text-teal-600" /> },
  ]);
  const [activeChat, setActiveChat] = useState(null);

  const handleChat = (assistantId) => {
    const assistant = assistants.find(a => a.id === assistantId);
    setActiveChat(assistant);
  };

  const handleCreateAssistant = (newAssistant) => {
    setAssistants([...assistants, { id: Date.now(), ...newAssistant, icon: <UserPlus className="h-6 w-6 text-teal-600" /> }]);
  };

  const handleConfigureAssistant = (assistantId) => {
    // TODO: Implement configuration logic
    console.log('Configure assistant:', assistantId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800 flex items-center">
        <Leaf className="mr-2 h-8 w-8 text-teal-600" />
        Oosh Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-700">
              <MessageSquare className="mr-2 text-teal-600" />
              AI Assistants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {assistants.map((assistant) => (
                <AIAssistant
                  key={assistant.id}
                  name={assistant.name}
                  icon={assistant.icon}
                  onChat={() => handleChat(assistant.id)}
                  onConfigure={() => handleConfigureAssistant(assistant.id)}
                />
              ))}
            </ScrollArea>
            <CreateAssistantDialog onCreateAssistant={handleCreateAssistant} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-teal-700">Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            {activeChat ? (
              <AIAssistantChat assistant={activeChat} />
            ) : (
              <div className="text-center text-teal-600 py-20">
                Select an AI Assistant to start chatting
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
