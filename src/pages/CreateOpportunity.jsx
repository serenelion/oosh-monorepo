import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Leaf } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import EditorToolbar from '@/components/EditorToolbar';

const OPPORTUNITY_CATEGORIES = [
  { value: 'volunteer', label: 'Volunteer', fields: ['duration', 'skills'] },
  { value: 'job', label: 'Job', fields: ['salary', 'employmentType'] },
  { value: 'investment', label: 'Investment', fields: ['amount', 'equity'] },
  { value: 'liveEvent', label: 'Live Event', fields: ['venue', 'capacity'] },
  { value: 'onlineTraining', label: 'Online Training', fields: ['platform', 'duration'] },
  { value: 'landForSale', label: 'Land for Sale', fields: ['acreage', 'price'] },
];

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [metadata, setMetadata] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editor) {
      const content = editor.getJSON();
      console.log('Form submitted:', { title, selectedCategory, metadata, startDate, endDate, location, content });
      navigate('/opportunities');
    }
  };

  const handleMetadataChange = (field, value) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <Card className="w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-lg border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-800 flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-teal-600" />
              Create New Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="mt-2">
                      {OPPORTUNITY_CATEGORIES.map((category) => (
                        <div key={category.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={category.value} id={category.value} />
                          <Label htmlFor={category.value}>{category.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  {selectedCategory && (
                    <div className="space-y-4">
                      {OPPORTUNITY_CATEGORIES.find(c => c.value === selectedCategory)?.fields.map((field) => (
                        <div key={field}>
                          <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                          <Input
                            id={field}
                            value={metadata[field] || ''}
                            onChange={(e) => handleMetadataChange(field, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
                <div>
                  <Label>Details</Label>
                  <div className="mt-1 border border-gray-300 rounded-md p-2">
                    <EditorToolbar editor={editor} />
                    <EditorContent editor={editor} className="min-h-[300px] prose max-w-none" />
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
