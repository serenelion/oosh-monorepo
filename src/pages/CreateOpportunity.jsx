import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Leaf, Briefcase, Users, PiggyBank, Calendar, Video, Map } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const OPPORTUNITY_CATEGORIES = [
  { value: 'volunteer', label: 'Volunteer', icon: <Users className="h-6 w-6" /> },
  { value: 'job', label: 'Job', icon: <Briefcase className="h-6 w-6" /> },
  { value: 'investment', label: 'Investment', icon: <PiggyBank className="h-6 w-6" /> },
  { value: 'liveEvent', label: 'Live Event', icon: <Calendar className="h-6 w-6" /> },
  { value: 'onlineTraining', label: 'Online Training', icon: <Video className="h-6 w-6" /> },
  { value: 'landForSale', label: 'Land for Sale', icon: <Map className="h-6 w-6" /> },
];

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      initEditor();
    }
    return () => {
      if (editorInstanceRef.current && typeof editorInstanceRef.current.destroy === 'function') {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: editorRef.current,
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
        }
      },
      data: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Start typing your opportunity details here..."
            }
          }
        ]
      },
      placeholder: 'Enter opportunity details here...',
      onChange: () => {
        console.log('Editor content changed');
      }
    });

    editor.isReady.then(() => {
      editorInstanceRef.current = editor;
    }).catch((error) => {
      console.error('Editor.js initialization failed:', error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorInstanceRef.current) {
      try {
        const editorData = await editorInstanceRef.current.save();
        const opportunityData = {
          title,
          category: selectedCategory,
          details: editorData,
        };
        console.log('Form submitted:', opportunityData);
        // TODO: Send data to backend
        navigate('/opportunities');
      } catch (error) {
        console.error('Error saving editor data:', error);
      }
    }
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
              <div className="space-y-6">
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
                  <Label className="mb-2 block">Category</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {OPPORTUNITY_CATEGORIES.map((category) => (
                      <Card
                        key={category.value}
                        className={`cursor-pointer transition-all ${
                          selectedCategory === category.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-4">
                          {category.icon}
                          <span className="mt-2 text-sm font-medium">{category.label}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Details</Label>
                  <div 
                    ref={editorRef} 
                    className="mt-1 border border-gray-300 rounded-md min-h-[200px] p-4"
                  />
                </div>
              </div>
              <div className="pt-6">
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Create Opportunity
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateOpportunity;
