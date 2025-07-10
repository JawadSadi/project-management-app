// src/features/projects/ProjectList.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { deleteProject } from "./projectSlice";
import EditProjectForm from "./EditProjectForm";
import type { Project } from "./types";
import TaskList from "./TaskList";

function ProjectList() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch<AppDispatch>();

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Project List</h2>

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded">
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <div>
                  <h4 className="font-semibold text-lg mb-2">{project.name}</h4>
                  <p className="text-gray-500 text-sm">{project.description}</p>
                  <TaskList project={project} />
                </div>
                {project.completed && (
                  <span className="text-green-600 text-sm font-semibold">
                    ✔ Completed
                  </span>
                )}
                <div className="flex flex-col items-end gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => setEditingProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => dispatch(deleteProject(project.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
