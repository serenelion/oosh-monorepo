import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send } from 'lucide-react';
import FlowerOfLife from '@/components/FlowerOfLife';
import WaveAnimation from '@/components/WaveAnimation';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm here to help you with your social enterprise goals. Can you tell me about your current productivity challenges?",
        sender: 'ai'
      }
    ]);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // TODO: Integrate with OpenAI API
    setTimeout(() => {
      setMessages([...newMessages, {
        text: "Thank you for sharing. How do you currently organize your projects and tasks?",
        sender: 'ai'
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen gradient-bg relative">
      <FlowerOfLife />
      <header className="bg-white bg-opacity-80 shadow-sm p-4 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Movement Creator</h1>
      </header>
      <main className="flex-grow p-4 flex flex-col relative z-10">
        <Card className="flex-grow flex flex-col bg-white bg-opacity-80 backdrop-blur-sm">
          <ScrollArea className="flex-grow p-4" ref={chatRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`chat-bubble ${
                    message.sender === 'user'
                      ? 'chat-bubble-user'
                      : 'chat-bubble-ai'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </Card>
      </main>
      <footer className="bg-white bg-opacity-80 shadow-sm p-4 mt-auto relative z-10">
        <Button onClick={() => navigate('/auth')} variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Sign Up / Login
        </Button>
      </footer>
      <WaveAnimation />
    </div>
  );
};

export default Index;
