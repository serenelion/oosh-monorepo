import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocation } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';
import TaskList from '../components/TaskList';

const initialProjects = [
  {
    id: 'project-1',
    name: 'Sustainable Agriculture Initiative',
    details: 'Implementing permaculture techniques in urban areas',
    leadBy: 'Jane Doe',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    budget: 50000,
    status: 'In Progress',
    tasks: {
      todo: [{ id: 'task-1', content: 'Research urban permaculture methods' }],
      inProgress: [{ id: 'task-2', content: 'Design pilot garden layout' }],
      done: [{ id: 'task-3', content: 'Secure funding for initial phase' }],
    },
  },
];

const Clarity = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentProject, setCurrentProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get('project');
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [location, projects]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const projectIndex = projects.findIndex(p => p.id === currentProject.id);
    const updatedProject = { ...projects[projectIndex] };
    const sourceColumn = updatedProject.tasks[source.droppableId];
    const destColumn = updatedProject.tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;
    setProjects(updatedProjects);
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: `task-${Date.now()}`, content: newTask };
    const projectIndex = projects.findIndex(p => p.id === currentProject.id);
    const updatedProject = { ...projects[projectIndex] };
    updatedProject.tasks.todo.push(newTaskObj);
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;
    setProjects(updatedProjects);
    setNewTask('');
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const saveProject = () => {
    if (currentProject.id) {
      const updatedProjects = projects.map(p => p.id === currentProject.id ? currentProject : p);
      setProjects(updatedProjects);
    } else {
      const newProject = {
        ...currentProject,
        id: `project-${Date.now()}`,
        tasks: { todo: [], inProgress: [], done: [] },
      };
      setProjects([...projects, newProject]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-800">Project Management</h1>
      <div className="mb-6 flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setCurrentProject({})}>Add New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <ProjectDetails
              currentProject={currentProject}
              handleProjectChange={handleProjectChange}
              saveProject={saveProject}
            />
          </DialogContent>
        </Dialog>
        <select
          className="border rounded p-2"
          onChange={(e) => setCurrentProject(projects.find(p => p.id === e.target.value))}
          value={currentProject?.id || ''}
        >
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      {currentProject && (
        <>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <Card className="p-4 bg-teal-100">
              <h2 className="font-bold mb-2">Project Details</h2>
              <ProjectDetails currentProject={currentProject} />
            </Card>
            <Card className="p-4 bg-teal-100">
              <h2 className="font-bold mb-2">Add New Task</h2>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="New task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="mr-2 flex-grow"
                />
                <Button onClick={addTask}>Add Task</Button>
              </div>
            </Card>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex space-x-4">
              <TaskList tasks={currentProject.tasks} />
            </div>
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default Clarity;
