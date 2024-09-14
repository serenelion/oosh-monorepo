-- Create Chats table
CREATE TABLE Chats (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id),
    title TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE
);

-- Create Messages table
CREATE TABLE Messages (
    id BIGSERIAL PRIMARY KEY,
    chat_id BIGINT REFERENCES Chats(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL
);

-- Create Assistants table
CREATE TABLE Assistants (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ChatAssistants table (for many-to-many relationship between Chats and Assistants)
CREATE TABLE ChatAssistants (
    chat_id BIGINT REFERENCES Chats(id) ON DELETE CASCADE,
    assistant_id BIGINT REFERENCES Assistants(id) ON DELETE CASCADE,
    PRIMARY KEY (chat_id, assistant_id)
);

-- Create Projects table
CREATE TABLE Projects (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Tasks table
CREATE TABLE Tasks (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES Projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_chats_user_id ON Chats(user_id);
CREATE INDEX idx_messages_chat_id ON Messages(chat_id);
CREATE INDEX idx_projects_user_id ON Projects(user_id);
CREATE INDEX idx_tasks_project_id ON Tasks(project_id);