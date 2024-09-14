import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Send } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useNavigate } from 'react-router-dom';

const FarmerOnboarding = () => {
  const navigate = useNavigate();
  const [farmProfile, setFarmProfile] = useState({
    farmName: '',
    farmerName: '',
    location: '',
    description: '',
    products: [],
    opportunities: [],
    values: [],
  });
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const chatRef = useRef(null);

  const steps = [
    { question: "Welcome to Oosh! Let's set up your farmer profile. What's the name of your farm?", field: 'farmName' },
    { question: "Great! And what's your name?", field: 'farmerName' },
    { question: "Where is your farm located?", field: 'location' },
    { question: "Please provide a brief description of your farm:", field: 'description' },
    { question: "What are the main products you produce? (Separate with commas)", field: 'products' },
    { question: "Are there any current opportunities on your farm? (e.g., 'Seeking a greenhouse manager')", field: 'opportunities' },
    { question: "Finally, what are some core values of your farm? (Separate with commas)", field: 'values' },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      addMessage(steps[0].question, 'ai');
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

  const handleSend = () => {
    if (currentInput.trim() === '') return;

    addMessage(currentInput, 'user');
    updateProfile(steps[currentStep].field, currentInput);

    setCurrentInput('');
    setCurrentStep(prevStep => prevStep + 1);

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        addMessage(steps[currentStep + 1].question, 'ai');
      }, 500);
    } else {
      setTimeout(() => {
        addMessage("Great! Your farmer profile is complete. Let's review the information:", 'ai');
        addMessage(JSON.stringify(farmProfile, null, 2), 'ai');
        addMessage("Is everything correct? Type 'yes' to confirm or 'edit' to make changes.", 'ai');
      }, 500);
    }
  };

  const updateProfile = (field, value) => {
    setFarmProfile(prevProfile => ({
      ...prevProfile,
      [field]: field === 'products' || field === 'opportunities' || field === 'values'
        ? value.split(',').map(item => item.trim())
        : value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleFinalConfirmation = (input) => {
    if (input.toLowerCase() === 'yes') {
      // Save the profile and navigate to the dashboard
      console.log('Saving profile:', farmProfile);
      navigate('/dashboard');
    } else if (input.toLowerCase() === 'edit') {
      // Reset to the beginning of the onboarding process
      setCurrentStep(0);
      setMessages([{ text: steps[0].question, sender: 'ai' }]);
    } else {
      addMessage("Please type 'yes' to confirm or 'edit' to make changes.", 'ai');
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <AnimatedBackground />
      <header className="bg-white bg-opacity-80 shadow-sm p-4 flex justify-between items-center relative z-20">
        <h1 className="text-2xl font-bold text-teal-700 flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-teal-500" />
          Farmer Welcome Kit
        </h1>
      </header>
      <main className="flex-grow p-4 flex flex-col relative z-10">
        <Card className="chat-container">
          <ScrollArea className="chat-messages h-[calc(100vh-200px)]" ref={chatRef}>
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
          </ScrollArea>
          <CardContent className="chat-input-container p-4">
            <div className="chat-input flex">
              <Input
                type="text"
                placeholder="Type your answer..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow mr-2 border-teal-300 focus:ring-teal-500"
              />
              <Button onClick={handleSend} className="bg-teal-500 hover:bg-teal-600 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerOnboarding;
