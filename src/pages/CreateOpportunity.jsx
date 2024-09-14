import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Leaf, X } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';

const OPPORTUNITY_CATEGORIES = [
  'Volunteer', 'Job', 'Investment', 'Live Event', 'Online Training', 'Land for Sale'
];

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [editor, setEditor] = useState(null);

  const initializeEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
        embed: Embed,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Replace with your image upload endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Replace with your image fetch endpoint
            }
          }
        },
        linkTool: LinkTool,
        quote: Quote,
        checklist: Checklist,
        code: CodeTool,
        table: Table,
      },
      placeholder: 'Enter opportunity details...',
      data: {}
    });
    setEditor(editor);
  }, []);

  useEffect(() => {
    if (!editor) {
      initializeEditor();
    }
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor, initializeEditor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editor) {
      const data = await editor.save();
      console.log('Form submitted:', { title, selectedCategories, startDate, endDate, location, details: data });
      // TODO: Send data to backend
      navigate('/opportunities');
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
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
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {OPPORTUNITY_CATEGORIES.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          onClick={() => toggleCategory(category)}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          size="sm"
                          className={`${
                            selectedCategories.includes(category)
                              ? 'bg-teal-500 text-white'
                              : 'text-teal-700 border-teal-300'
                          } hover:bg-teal-600 hover:text-white transition-colors`}
                        >
                          {category}
                          {selectedCategories.includes(category) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
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
                <div>
                  <Label>Details</Label>
                  <div id="editorjs" className="min-h-[400px] border border-gray-300 rounded-md p-2 mt-1"></div>
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
