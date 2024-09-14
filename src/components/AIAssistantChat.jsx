import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';

const AIAssistantChat = ({ assistant }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: `Hello! I'm ${assistant.name}. How can I assist you today?`, sender: 'ai' }
    ]);
  }, [assistant]);

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

    // TODO: Integrate with AI backend
    setTimeout(() => {
      setIsTyping(false);
      setMessages([...newMessages, {
        text: `As ${assistant.name}, I'd be happy to help with that. Can you provide more details?`,
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <div className="chat-container h-full">
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
            className="flex-grow mr-2 border-teal-300 focus:ring-teal-500"
          />
          <Button onClick={handleSend} className="bg-teal-500 hover:bg-teal-600 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantChat;
