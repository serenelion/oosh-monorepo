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
    { question: "Welcome to Oosh! Let's create your unique farmer profile. What's the name of your farm or project?", field: 'farmName' },
    { question: "Wonderful! And what's your name? We'd love to know who's behind this amazing initiative.", field: 'farmerName' },
    { question: "Where is your farm or project located? This helps connect you with local opportunities and resources.", field: 'location' },
    { question: "Now, let's paint a picture of your farm. In a few sentences, what makes your farm special?", field: 'description' },
    { question: "What are the main products or services you offer? (Separate with commas, e.g., 'organic vegetables, honey, farm tours')", field: 'products' },
    { question: "Are there any current opportunities or needs on your farm? (e.g., 'Seeking a greenhouse manager', 'Looking for volunteers')", field: 'opportunities' },
    { question: "Finally, what are some core values or principles that guide your farm? These could be related to sustainability, community, or your farming philosophy. (Separate with commas)", field: 'values' },
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
        addMessage("Fantastic! You've completed your farmer profile. Let's review the information:", 'ai');
        addMessage(JSON.stringify(farmProfile, null, 2), 'ai');
        addMessage("Does everything look correct? Type 'yes' to confirm or 'edit' if you'd like to make any changes.", 'ai');
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
      console.log('Saving profile:', farmProfile);
      addMessage("Great! Your profile has been saved. We're excited to have you on board!", 'ai');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else if (input.toLowerCase() === 'edit') {
      setCurrentStep(0);
      setMessages([{ text: steps[0].question, sender: 'ai' }]);
    } else {
      addMessage("I didn't quite catch that. Please type 'yes' to confirm your profile or 'edit' to make changes.", 'ai');
    }
  };

  const handleInput = (input) => {
    if (currentStep >= steps.length) {
      handleFinalConfirmation(input);
    } else {
      handleSend();
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
              <Button onClick={() => handleInput(currentInput)} className="bg-teal-500 hover:bg-teal-600 text-white">
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
