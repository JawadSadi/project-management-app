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
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isAdmin = currentUser?.role === "admin";

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
            <li
              key={project.id}
              className={`p-4 rounded shadow-sm border transition 
                ${
                  project.completed
                    ? "bg-green-50 border-green-400"
                    : "bg-white"
                }
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{project.name}</h4>
                  <p className="text-gray-500 text-sm">{project.description}</p>
                </div>

                {project.completed && (
                  <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded">
                    ✅ Completed
                  </span>
                )}
              </div>

              <TaskList project={project} />

              {isAdmin && (
                <div className="flex gap-4 justify-end mt-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setEditingProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => dispatch(deleteProject(project.id))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
