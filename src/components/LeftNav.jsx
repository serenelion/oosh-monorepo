import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

const LeftNav = ({ assistants, chats, onSelectAssistant, onSelectChat }) => {
  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4">
          <h2 className="font-semibold mb-2">AI Assistants</h2>
          {assistants.map((assistant) => (
            <Button
              key={assistant.id}
              onClick={() => onSelectAssistant(assistant.id)}
              className="w-full justify-start mb-2 bg-white hover:bg-gray-100 text-gray-800"
            >
              {assistant.icon}
              <span className="ml-2">{assistant.name}</span>
            </Button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <h2 className="font-semibold mb-2">Recent Chats</h2>
          {chats.map((chat) => (
            <Button
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="w-full justify-start mb-2 bg-white hover:bg-gray-100 text-gray-800"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="truncate">{chat.assistant.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
};

export default LeftNav;