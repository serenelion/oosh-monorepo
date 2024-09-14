import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, PlusSquare } from 'lucide-react';

const NewGPT = () => {
  const [currentTab, setCurrentTab] = useState('create');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [conversationStarters, setConversationStarters] = useState(['']);

  const handleAddConversationStarter = () => {
    setConversationStarters([...conversationStarters, '']);
  };

  const handleConversationStarterChange = (index, value) => {
    const updatedStarters = [...conversationStarters];
    updatedStarters[index] = value;
    setConversationStarters(updatedStarters);
  };

  const handleRemoveConversationStarter = (index) => {
    const updatedStarters = conversationStarters.filter((_, i) => i !== index);
    setConversationStarters(updatedStarters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <PlusSquare className="mr-2 h-6 w-6 text-teal-600" />
            New GPT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="configure">Configure</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input
                    id="name"
                    placeholder="Name your GPT"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    id="description"
                    placeholder="Add a short description about what this GPT does"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
                  <Textarea
                    id="instructions"
                    placeholder="What does this GPT do? How does it behave? What should it avoid doing?"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="mt-1"
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="configure">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Conversation starters</label>
                  {conversationStarters.map((starter, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Input
                        value={starter}
                        onChange={(e) => handleConversationStarterChange(index, e.target.value)}
                        placeholder="Add a conversation starter"
                        className="flex-grow"
                      />
                      <Button
                        onClick={() => handleRemoveConversationStarter(index)}
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                  <Button onClick={handleAddConversationStarter} variant="outline" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Add starter
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Knowledge</label>
                  <p className="text-sm text-gray-500 mt-1">
                    If you upload files under Knowledge, conversations with your GPT may include file contents. Files can be downloaded when Code Interpreter is enabled.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Upload files
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-end">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Create GPT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewGPT;
