// src/features/projects/projectSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "./types";
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
  },
});

export const { addProject, deleteProject, updateProject } =
  projectSlice.actions;
export default projectSlice.reducer;
