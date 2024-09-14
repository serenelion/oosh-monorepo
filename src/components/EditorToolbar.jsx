import React from 'react';
import { Bold, Italic, Underline, List, Link, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2 flex space-x-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          const url = window.prompt('Enter the URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? 'bg-gray-200' : ''}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          const url = window.prompt('Enter the image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <Image className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
