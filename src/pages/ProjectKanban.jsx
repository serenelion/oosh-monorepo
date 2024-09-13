import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ProjectKanban = () => {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Project A', status: 'Planning', details: 'Project A details' },
    { id: '2', name: 'Project B', status: 'In Progress', details: 'Project B details' },
    { id: '3', name: 'Project C', status: 'Completed', details: 'Project C details' },
  ]);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedProjects = projects.map(project => {
      if (project.id === draggableId) {
        return { ...project, status: destination.droppableId };
      }
      return project;
    });

    setProjects(updatedProjects);
    // TODO: Update project status in backend
  };

  const handleEditProject = (project) => {
    setEditingProject({ ...project });
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    setProjects(updatedProjects);
    setEditingProject(null);
    // TODO: Update project in backend
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
                              className="bg-white p-4 mb-2 rounded shadow"
                            >
                              <h3 className="font-bold">{project.name}</h3>
                              <p className="text-sm text-gray-600">{project.details}</p>
                              <div className="mt-2 flex justify-between">
                                <Button onClick={() => navigate(`/clarity?project=${project.id}`)} variant="outline" size="sm">
                                  View
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button onClick={() => handleEditProject(project)} variant="outline" size="sm">
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Project</DialogTitle>
                                    </DialogHeader>
                                    {editingProject && (
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="name" className="text-right">Name</Label>
                                          <Input
                                            id="name"
                                            value={editingProject.name}
                                            onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="details" className="text-right">Details</Label>
                                          <Input
                                            id="details"
                                            value={editingProject.details}
                                            onChange={(e) => setEditingProject({ ...editingProject, details: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <Button onClick={handleSaveProject}>Save Changes</Button>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </div>
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
