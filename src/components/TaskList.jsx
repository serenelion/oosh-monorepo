import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TaskList = ({ tasks }) => {
  return (
    <div className="flex space-x-4">
      {Object.entries(tasks || {}).map(([columnId, columnTasks]) => (
        <Card key={columnId} className="w-1/3 bg-teal-100">
          <CardHeader>
            <CardTitle className="text-teal-800">{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px]"
                >
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
  );
};

export default TaskList;
