import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tractor, Send } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const FarmerFriend = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState({});

  const farmerQuestions = [
    "What's your name?",
    "What's the name of your farm?",
    "Where is your farm located (country and region)?",
    "Do you have any opportunities that you're looking for people to support you with?",
    "Do you have a website for your farm?",
    "Would you be open to chat about your experience as a farmer with one of the humans creating this app?"
  ];

  const enthusiastQuestions = [
    "What's your name?",
    "What kinds of opportunities are you interested in discovering on permaculture farms? (e.g., volunteering, jobs, events, investment opportunities)",
    "Are you looking for opportunities in a specific location, or are you open to opportunities globally?"
  ];

  useEffect(() => {
    setMessages([
      { role: 'bot', content: "Hello! I'm your Farmer Friend Assistant, a digital community organizer. My purpose is to help build a directory of all the permacultures on the planet. Are you a permaculture farmer or an enthusiast?" },
    ]);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    let newMessages = [...messages, { role: 'user', content: input }];
    let botResponse = '';

    if (userType === null) {
      if (input.toLowerCase().includes('farmer')) {
        setUserType('farmer');
        botResponse = "Wonderful! It's great to meet a permaculture farmer. " + farmerQuestions[0];
      } else if (input.toLowerCase().includes('enthusiast')) {
        setUserType('enthusiast');
        botResponse = "Fantastic! We're always excited to connect with permaculture enthusiasts. " + enthusiastQuestions[0];
      } else {
        botResponse = "I'm sorry, I didn't catch that. Are you a permaculture farmer or an enthusiast?";
      }
    } else {
      const questions = userType === 'farmer' ? farmerQuestions : enthusiastQuestions;
      setUserData({ ...userData, [questions[currentStep]]: input });

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        botResponse = questions[currentStep + 1];
      } else {
        botResponse = userType === 'farmer'
          ? "Thank you so much for sharing about your farm! Your information will help us connect you with like-minded individuals and potential opportunities. Is there anything else you'd like to know about our permaculture community?"
          : "Thank you for sharing your interests! We'll use this information to help connect you with exciting permaculture opportunities. Is there anything specific you'd like to know about permaculture practices or our community?";
      }
    }

    newMessages.push({ role: 'bot', content: botResponse });
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
                placeholder="Type your response..."
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
