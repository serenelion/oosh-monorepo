import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, Leaf, ClipboardList, Lightbulb, Wrench } from 'lucide-react';
import AIAssistantChat from '../components/AIAssistantChat';
import LeftNav from '../components/LeftNav';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [assistants] = useState([
    { id: 1, name: 'People Connector (Coming Soon)', icon: <Users className="h-6 w-6 text-teal-600" />, disabled: true },
    { id: 2, name: 'Marketing Genius', icon: <Lightbulb className="h-6 w-6 text-teal-600" /> },
    { id: 3, name: 'Solutions Engineer', icon: <Wrench className="h-6 w-6 text-teal-600" /> },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const handleChat = (assistantId) => {
    const assistant = assistants.find(a => a.id === assistantId);
    if (assistant.disabled) return;
    setActiveChat(assistant);
    const newChat = { id: Date.now(), assistant, messages: [] };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="flex h-screen bg-white">
      <LeftNav
        assistants={assistants}
        chats={chats}
        onSelectAssistant={handleChat}
        onSelectChat={(chat) => setActiveChat(chat.assistant)}
      >
        <Button
          onClick={() => navigate('/clarity')}
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Project Management
        </Button>
      </LeftNav>
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-teal-800 flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-teal-600" />
            Oosh Dashboard
          </h1>
        </header>
        <div className="flex-1 overflow-hidden">
          {activeChat ? (
            <AIAssistantChat assistant={activeChat} />
          ) : (
            <div className="h-full flex items-center justify-center text-teal-600">
              <Leaf className="h-16 w-16 mr-4" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Oosh</h2>
                <p>Select an AI Assistant to start chatting or manage your projects</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
