import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const initialTasks = {
  todo: [
    { id: 'task-1', content: 'Define project scope' },
    { id: 'task-2', content: 'Create project timeline' },
  ],
  inProgress: [
    { id: 'task-3', content: 'Design user interface' },
  ],
  done: [
    { id: 'task-4', content: 'Set up project repository' },
  ],
};

const Clarity = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setTasks({...tasks});
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: `task-${Date.now()}`, content: newTask };
    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTaskObj],
    });
    setNewTask('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mr-2 inline-block w-64"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Card key={columnId} className="w-1/3">
              <CardHeader>
                <CardTitle>{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 mb-2 rounded shadow"
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Clarity;