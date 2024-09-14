import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import FlowerOfLife from './FlowerOfLife';

const OPPORTUNITY_CATEGORIES = [
  'Volunteer',
  'Job',
  'Investment',
  'Live Event',
  'Online Training',
  'Land for Sale'
];

const CreateOpportunityDialog = ({ onCreateOpportunity }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreate = () => {
    if (title && description && category && location && startDate && endDate) {
      onCreateOpportunity({ title, description, category, location, startDate, endDate });
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-700 flex items-center">
            Create New Opportunity
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          <FlowerOfLife />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPPORTUNITY_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 px-6 pb-6">
            <Button onClick={handleCreate} className="bg-teal-500 hover:bg-teal-600 text-white">
              Create Opportunity
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOpportunityDialog;
