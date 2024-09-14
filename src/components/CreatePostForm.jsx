import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

const OPPORTUNITY_TAGS = ['volunteer', 'job', 'investment', 'live event', 'online training', 'land for sale'];

const CreatePostForm = ({ onSubmit }) => {
  const [postType, setPostType] = useState('opportunity');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type: postType, title, content, tags });
    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="post-type">Post Type</Label>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger id="post-type">
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="opportunity">Opportunity</SelectItem>
            <SelectItem value="update">Update</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
            </Badge>
          ))}
        </div>
        {postType === 'opportunity' && (
          <div className="flex flex-wrap gap-2 mb-2">
            {OPPORTUNITY_TAGS.map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Add custom tag"
          />
          <Button type="button" onClick={() => handleAddTag(customTag)}>Add Tag</Button>
        </div>
      </div>

      <Button type="submit">Create Post</Button>
    </form>
  );
};

export default CreatePostForm;