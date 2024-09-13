import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const ProjectKanban = () => {
  const [projects, setProjects] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    // TODO: Fetch projects from API or global state
    setProjects([
      { id: '1', name: 'Project A', status: 'Planning', details: 'Project A details' },
      { id: '2', name: 'Project B', status: 'In Progress', details: 'Project B details' },
      { id: '3', name: 'Project C', status: 'Completed', details: 'Project C details' },
    ]);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedProjects = projects.map(project => {
      if (project.id === draggableId) {
        return { ...project, status: destination.droppableId };
      }
      return project;
    });

    setProjects(updatedProjects);
    // TODO: Update project status in backend
  };

  const columns = ['Planning', 'In Progress', 'Completed'];

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-800">Project Kanban</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {columns.map(column => (
            <Card key={column} className="w-1/3 bg-teal-100">
              <CardHeader>
                <CardTitle className="text-teal-800">{column}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                      {projects.filter(project => project.status === column).map((project, index) => (
                        <Draggable key={project.id} draggableId={project.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 mb-2 rounded shadow cursor-pointer"
                              onClick={() => navigate(`/clarity?project=${project.id}`)}
                            >
                              <h3 className="font-bold">{project.name}</h3>
                              <p className="text-sm text-gray-600">{project.details}</p>
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

export default ProjectKanban;