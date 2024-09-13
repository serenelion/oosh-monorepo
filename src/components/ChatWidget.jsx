import React, { useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SolutionGenerator from './SolutionGenerator';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div className={`fixed ${isFullScreen ? 'inset-0' : 'bottom-4 right-4'} z-50 transition-all duration-300 ease-in-out`}>
      {!isOpen && (
        <Button onClick={toggleChat} className="bg-teal-500 hover:bg-teal-600 text-white">
          Chat
        </Button>
      )}
      {isOpen && (
        <Card className={`${isFullScreen ? 'w-full h-full' : 'w-80 h-96'} ${isMinimized ? 'h-12' : ''} flex flex-col`}>
          <CardHeader className="flex flex-row items-center justify-between p-2">
            <CardTitle className="text-sm font-medium">Solution Generator</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className={`flex-grow overflow-hidden ${isMinimized ? 'hidden' : ''}`}>
            <SolutionGenerator />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;