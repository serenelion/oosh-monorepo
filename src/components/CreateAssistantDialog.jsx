import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Leaf, Settings } from 'lucide-react';

const CreateAssistantDialog = ({ onCreateAssistant }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capabilities, setCapabilities] = useState([]);
  const [currentTab, setCurrentTab] = useState('create');

  const handleCreate = () => {
    if (name.trim() && description.trim()) {
      onCreateAssistant({ name, description, capabilities });
      setName('');
      setDescription('');
      setCapabilities([]);
      setCurrentTab('create');
    }
  };

  const handleCapabilityChange = (capability) => {
    setCapabilities(prev => 
      prev.includes(capability) 
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> New GPT
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-700 flex items-center">
            <Leaf className="mr-2 h-6 w-6" />
            Create New GPT
          </DialogTitle>
        </DialogHeader>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter GPT name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe what your GPT does"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="configure">
            <div className="grid gap-4 py-4">
              <h3 className="font-semibold text-teal-700">Capabilities</h3>
              <div className="space-y-2">
                {['Web Browsing', 'DALL-E Image Generation', 'Code Interpreter & Data Analysis'].map((capability) => (
                  <label key={capability} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={capabilities.includes(capability)}
                      onChange={() => handleCapabilityChange(capability)}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>{capability}</span>
                  </label>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={handleCreate} className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-4">
          Create GPT
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssistantDialog;
