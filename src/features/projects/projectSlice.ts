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
  },
});

export const { addProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
