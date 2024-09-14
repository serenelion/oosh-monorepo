import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FlowerOfLife from '@/components/FlowerOfLife';
import WaveAnimation from '@/components/WaveAnimation';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMessages([
      {
        text: "Welcome to Oosh! I'm an AI, and I'm being trained to help you to connect with the collective intelligence of the permaculture community.",
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
    setIsTyping(true);

    // TODO: Integrate with OpenAI API
    setTimeout(() => {
      setIsTyping(false);
      setMessages([...newMessages, {
        text: "That's an interesting perspective! How do you think this relates to permaculture principles?",
        sender: 'ai'
      }]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-50 to-teal-100 relative">
      <FlowerOfLife />
      <header className="bg-white bg-opacity-80 shadow-sm p-4 flex justify-between items-center relative z-20">
        <h1 className="text-2xl font-bold text-teal-700">Oosh</h1>
        <Button onClick={() => navigate('/join')} variant="outline" className="border-teal-500 text-teal-700 hover:bg-teal-50">
          Join the Network
        </Button>
      </header>
      <main className="flex-grow p-4 flex flex-col relative z-10">
        <Card className="flex-grow flex flex-col bg-white bg-opacity-80 backdrop-blur-sm border-teal-200">
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
                      ? 'chat-bubble-user bg-teal-500 text-white'
                      : 'chat-bubble-ai bg-teal-100 text-teal-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble chat-bubble-ai bg-teal-100 text-teal-900">
                <span className="typing-indicator">Oosh AI is typing<span>.</span><span>.</span><span>.</span></span>
              </div>
            )}
          </ScrollArea>
          <div className="p-4 flex">
            <Input
              type="text"
              placeholder="Share your thoughts on permaculture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow mr-2 border-teal-300 focus:ring-teal-500"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleSend} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share your thoughts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </main>
      <WaveAnimation />
    </div>
  );
};

export default Index;
