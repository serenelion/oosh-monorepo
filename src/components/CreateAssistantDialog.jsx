import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';

const CreateAssistantDialog = ({ onCreateAssistant }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (name.trim() && description.trim()) {
      onCreateAssistant({ name, description });
      setName('');
      setDescription('');
    }
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
          <DialogTitle className="text-2xl font-bold text-teal-700">Create New GPT</DialogTitle>
        </DialogHeader>
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
        <Button onClick={handleCreate} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssistantDialog;