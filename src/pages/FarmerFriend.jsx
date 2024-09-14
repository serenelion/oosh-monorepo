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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [surveyData, setSurveyData] = useState({});

  const surveyQuestions = [
    "What's your name and the name of your farm?",
    "Where is your farm located (country and region)?",
    "How long have you been practicing permaculture?",
    "What's the size of your permaculture farm?",
    "What are the main crops or products you produce?",
    "Do you use any specific permaculture techniques or principles?",
    "What challenges do you face in your permaculture practice?",
    "Are you open to connecting with other permaculture farmers in your area?",
    "Would you like to share any tips or success stories from your permaculture experience?",
    "How do you see technology supporting permaculture practices in the future?"
  ];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'bot', content: "Hello! I'm your Farmer Friend Assistant, a digital community organizer. My purpose is to help build a directory of all the permacultures on the planet. Would you like to participate in our survey?" },
      ]);
    }
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    let newMessages = [...messages, { role: 'user', content: input }];

    if (!surveyComplete) {
      if (currentQuestion === 0 && input.toLowerCase() !== 'yes') {
        newMessages.push({ role: 'bot', content: "I understand. If you change your mind, feel free to come back anytime. Is there anything else I can help you with regarding permaculture?" });
        setSurveyComplete(true);
      } else {
        setSurveyData({ ...surveyData, [surveyQuestions[currentQuestion]]: input });
        
        if (currentQuestion < surveyQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          newMessages.push({ role: 'bot', content: surveyQuestions[currentQuestion + 1] });
        } else {
          newMessages.push({ role: 'bot', content: "Thank you for completing the survey! Your input is valuable for our permaculture community. Is there anything else you'd like to know or discuss about permaculture?" });
          setSurveyComplete(true);
          // Here you would typically send the surveyData to your backend
          console.log("Survey data:", surveyData);
        }
      }
    } else {
      newMessages.push({ role: 'bot', content: "That's interesting! As a permaculture assistant, I'm here to help. What specific aspect of permaculture would you like to explore further?" });
    }

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
