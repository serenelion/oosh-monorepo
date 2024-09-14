import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Leaf, ChevronDown } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import EditorToolbar from '@/components/EditorToolbar';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const OPPORTUNITY_CATEGORIES = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'job', label: 'Job' },
  { value: 'investment', label: 'Investment' },
  { value: 'liveEvent', label: 'Live Event' },
  { value: 'onlineTraining', label: 'Online Training' },
  { value: 'landForSale', label: 'Land for Sale' },
];

const CATEGORY_METADATA = {
  volunteer: [
    { name: 'duration', label: 'Duration', type: 'text' },
    { name: 'skills', label: 'Required Skills', type: 'text' },
  ],
  job: [
    { name: 'salary', label: 'Salary Range', type: 'text' },
    { name: 'employmentType', label: 'Employment Type', type: 'text' },
  ],
  investment: [
    { name: 'amount', label: 'Investment Amount', type: 'number' },
    { name: 'equity', label: 'Equity Offered', type: 'text' },
  ],
  liveEvent: [
    { name: 'venue', label: 'Venue', type: 'text' },
    { name: 'capacity', label: 'Capacity', type: 'number' },
  ],
  onlineTraining: [
    { name: 'platform', label: 'Platform', type: 'text' },
    { name: 'duration', label: 'Duration', type: 'text' },
  ],
  landForSale: [
    { name: 'acreage', label: 'Acreage', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' },
  ],
};

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [metadata, setMetadata] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
    ],
    content: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editor) {
      const content = editor.getHTML();
      console.log('Form submitted:', { title, selectedCategory, metadata, startDate, endDate, location, content });
      navigate('/opportunities');
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMetadata({});
  };

  const handleMetadataChange = (field, value) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-6xl mx-auto">
        <Card className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-lg border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-800 flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-teal-600" />
              Create New Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between mt-1">
                          {selectedCategory ? OPPORTUNITY_CATEGORIES.find(c => c.value === selectedCategory)?.label : 'Select category'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange} className="flex flex-col">
                          {OPPORTUNITY_CATEGORIES.map((category) => (
                            <Label
                              key={category.value}
                              htmlFor={category.value}
                              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <RadioGroupItem value={category.value} id={category.value} />
                              <span>{category.label}</span>
                            </Label>
                          ))}
                        </RadioGroup>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {selectedCategory && CATEGORY_METADATA[selectedCategory].map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type={field.type}
                        value={metadata[field.name] || ''}
                        onChange={(e) => handleMetadataChange(field.name, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Details</Label>
                  <div className="mt-1 border border-gray-300 rounded-md p-2">
                    <EditorToolbar editor={editor} />
                    <EditorContent editor={editor} className="min-h-[500px] prose max-w-none" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                Create Opportunity
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateOpportunity;
