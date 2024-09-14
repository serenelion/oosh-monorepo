import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, UserPlus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AIAssistantChat from '../components/AIAssistantChat';

const AIAssistant = ({ name, icon, onChat }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="flex items-center">
        {icon}
        <span className="ml-2">{name}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={onChat} className="w-full">Chat Now</Button>
    </CardContent>
  </Card>
);

const CreateAssistantDialog = ({ onCreateAssistant }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    onCreateAssistant({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Create New Assistant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Assistant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Assistant Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const [assistants, setAssistants] = useState([
    { id: 1, name: 'People Connector', icon: <Users className="h-6 w-6" /> },
    { id: 2, name: 'Farmer Friend', icon: <MessageSquare className="h-6 w-6" /> },
  ]);
  const [activeChat, setActiveChat] = useState(null);

  const handleChat = (assistantId) => {
    const assistant = assistants.find(a => a.id === assistantId);
    setActiveChat(assistant);
  };

  const handleCreateAssistant = (newAssistant) => {
    setAssistants([...assistants, { id: Date.now(), ...newAssistant, icon: <UserPlus className="h-6 w-6" /> }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              AI Assistants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {assistants.map((assistant) => (
                <AIAssistant
                  key={assistant.id}
                  name={assistant.name}
                  icon={assistant.icon}
                  onChat={() => handleChat(assistant.id)}
                />
              ))}
            </ScrollArea>
            <CreateAssistantDialog onCreateAssistant={handleCreateAssistant} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            {activeChat ? (
              <AIAssistantChat assistant={activeChat} />
            ) : (
              <div className="text-center text-gray-500">
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
