// src/features/projects/projectSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project, Task } from "./types";
import { v4 as uuidv4 } from "uuid";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      const newProject: Project = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        tasks: [],
      };
      state.projects.push(newProject);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    updateProject: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string }>
    ) => {
      const { id, name, description } = action.payload;
      const project = state.projects.find((p) => p.id === id);
      if (project) {
        project.name = name;
        project.description = description;
      }
    },
    addTaskToProject: (
      state,
      action: PayloadAction<{ projectId: string; title: string }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId
      );
      if (project) {
        const newTask: Task = {
          id: uuidv4(),
          title: action.payload.title,
          completed: false,
        };
        project.tasks.push(newTask);
      }
    },

    deleteTaskFromProject: (
      state,
      action: PayloadAction<{ projectId: string; taskId: string }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId
      );
      if (project) {
        project.tasks = project.tasks.filter(
          (t) => t.id !== action.payload.taskId
        );
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  addTaskToProject,
  deleteTaskFromProject,
} = projectSlice.actions;
export default projectSlice.reducer;
