import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, Leaf, ClipboardList } from 'lucide-react';
import AIAssistantChat from '../components/AIAssistantChat';
import LeftNav from '../components/LeftNav';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [assistants] = useState([
    { id: 1, name: 'People Connector', icon: <Users className="h-6 w-6 text-teal-600" /> },
    { id: 2, name: 'Farmer Friend', icon: <MessageSquare className="h-6 w-6 text-teal-600" /> },
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
    <div className="flex h-screen bg-white">
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-800 flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-teal-600" />
            Oosh
          </h1>
        </div>
        <ScrollArea className="flex-grow">
          <LeftNav
            assistants={assistants}
            chats={chats}
            onSelectAssistant={handleChat}
            onSelectChat={(chat) => setActiveChat(chat.assistant)}
          />
          <div className="p-4 border-t border-gray-200">
            <Link to="/clarity" className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
              <ClipboardList className="mr-2 h-5 w-5" />
              Project Management
            </Link>
          </div>
        </ScrollArea>
      </div>
      <main className="flex-1 flex flex-col">
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
