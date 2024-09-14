import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, Leaf, Lightbulb, Wrench } from 'lucide-react';
import AIAssistantChat from '../components/AIAssistantChat';
import LeftNav from '../components/LeftNav';
import AnimatedBackground from '@/components/AnimatedBackground';

const Dashboard = () => {
  const [assistants] = useState([
    { id: 1, name: 'People Connector', icon: <Users className="h-6 w-6 text-teal-600" /> },
    { id: 2, name: 'Marketing Genius', icon: <Lightbulb className="h-6 w-6 text-teal-600" /> },
    { id: 3, name: 'Solutions Engineer', icon: <Wrench className="h-6 w-6 text-teal-600" /> },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);

  const handleChat = (assistantId) => {
    const assistant = assistants.find(a => a.id === assistantId);
    setActiveChat(assistant);
    const newChat = { id: Date.now(), assistant, messages: [] };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      <LeftNav
        assistants={assistants}
        chats={chats}
        onSelectAssistant={handleChat}
        onSelectChat={(chat) => setActiveChat(chat.assistant)}
      />
      <main className="flex-1 flex flex-col relative z-10">
        <header className="bg-white bg-opacity-80 border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-teal-800 flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-teal-600" />
            Oosh Dashboard
          </h1>
        </header>
        <div className="flex-1 overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm p-4">
          {activeChat ? (
            <div className="chat-container h-full">
              <AIAssistantChat assistant={activeChat} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-teal-600">
              <Leaf className="h-16 w-16 mr-4" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Oosh</h2>
                <p>Select an AI Assistant to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
