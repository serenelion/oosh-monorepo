import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tractor, Send } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const FarmerFriend = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input },
      { role: 'bot', content: "I'm your Farmer Friend Assistant. How can I help you with your farming needs today?" }
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <AnimatedBackground />
      <header className="bg-white bg-opacity-80 shadow-sm p-4 flex items-center relative z-20">
        <Tractor className="mr-2 h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold text-green-700">Farmer Friend Assistant</h1>
      </header>
      <main className="flex-grow p-4 flex flex-col relative z-10">
        <Card className="chat-container h-full">
          <CardHeader>
            <CardTitle className="text-xl text-green-700">Chat with your Farmer Friend</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} animate-fadeIn`}>
                  {msg.content}
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your farming question..."
                className="flex-grow mr-2 border-green-300 focus:ring-green-500"
              />
              <Button onClick={sendMessage} className="bg-green-500 hover:bg-green-600 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerFriend;