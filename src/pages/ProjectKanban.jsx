import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const ProjectKanban = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch projects from API or global state
    setProjects([
      { id: '1', name: 'Project A', status: 'Planning', details: 'Project A details', budget: 10000, startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '2', name: 'Project B', status: 'In Progress', details: 'Project B details', budget: 20000, startDate: '2023-02-01', endDate: '2024-01-31' },
      { id: '3', name: 'Project C', status: 'Completed', details: 'Project C details', budget: 15000, startDate: '2023-03-01', endDate: '2023-09-30' },
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

  const handleEditProject = (project) => {
    setEditingProject({ ...project });
  };

  const handleSaveProject = () => {
    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    setEditingProject(null);
    // TODO: Update project in backend
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProject({ ...editingProject, [name]: value });
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
                                  View Details
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
                                      <div className="space-y-4">
                                        <Input
                                          name="name"
                                          value={editingProject.name}
                                          onChange={handleInputChange}
                                          placeholder="Project Name"
                                        />
                                        <Textarea
                                          name="details"
                                          value={editingProject.details}
                                          onChange={handleInputChange}
                                          placeholder="Project Details"
                                        />
                                        <Input
                                          name="budget"
                                          type="number"
                                          value={editingProject.budget}
                                          onChange={handleInputChange}
                                          placeholder="Budget"
                                        />
                                        <Input
                                          name="startDate"
                                          type="date"
                                          value={editingProject.startDate}
                                          onChange={handleInputChange}
                                        />
                                        <Input
                                          name="endDate"
                                          type="date"
                                          value={editingProject.endDate}
                                          onChange={handleInputChange}
                                        />
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
