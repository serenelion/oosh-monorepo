import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SolutionGenerator = () => {
  const [messages, setMessages] = useState([{ text: "How can I serve you?", sender: 'ai' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { text: "I'm here to help! What specific challenge are you facing?", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle>Solution Generator</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </CardContent>
      <div className="p-4 flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
};

export default SolutionGenerator;