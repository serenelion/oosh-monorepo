import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProjectDetails = ({ currentProject, handleProjectChange, saveProject }) => {
  if (!currentProject) return null;

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input id="name" name="name" value={currentProject.name || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="details" className="text-right">Details</Label>
        <Input id="details" name="details" value={currentProject.details || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="leadBy" className="text-right">Lead By</Label>
        <Input id="leadBy" name="leadBy" value={currentProject.leadBy || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="startDate" className="text-right">Start Date</Label>
        <Input id="startDate" name="startDate" type="date" value={currentProject.startDate || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="endDate" className="text-right">End Date</Label>
        <Input id="endDate" name="endDate" type="date" value={currentProject.endDate || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="budget" className="text-right">Budget</Label>
        <Input id="budget" name="budget" type="number" value={currentProject.budget || ''} onChange={handleProjectChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">Status</Label>
        <Select name="status" value={currentProject.status || ''} onValueChange={(value) => handleProjectChange({ target: { name: 'status', value } })}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {saveProject && <Button onClick={saveProject}>Save Project</Button>}
    </div>
  );
};

export default ProjectDetails;