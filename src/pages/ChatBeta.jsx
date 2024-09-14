import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Leaf } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const ChatBeta = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: "Welcome to the Oosh Chat Beta! I'm an AI assistant here to introduce you to our platform and help you join our network. How can I assist you today?",
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

    try {
      const response = await fetch('https://sea-turtle-app-4in2t.ondigitalocean.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages([...newMessages, { text: data.message, sender: 'ai' }]);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages([...newMessages, { text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai' }]);
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <AnimatedBackground />
      <header className="bg-white bg-opacity-80 shadow-sm p-4 flex justify-between items-center relative z-20">
        <h1 className="text-2xl font-bold text-teal-700 flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-teal-500" />
          Oosh Chat Beta
        </h1>
      </header>
      <main className="flex-grow p-4 flex flex-col relative z-10">
        <div className="chat-container">
          <ScrollArea className="chat-messages" ref={chatRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble chat-bubble-ai">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="chat-input-container">
            <div className="chat-input">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow border-teal-300 focus:ring-teal-500"
              />
              <Button onClick={handleSend} className="bg-teal-500 hover:bg-teal-600 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBeta;
