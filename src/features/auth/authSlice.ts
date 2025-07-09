import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./mockUsers";

interface AuthState {
  currentUser: User | null;
  users: User[];
}

function loadUsers(): User[] {
  const stored = localStorage.getItem("users");
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "admin-1",
          username: "admin",
          password: "1234",
          name: "Admin",
          role: "admin",
        },
      ];
}

function saveUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

const initialState: AuthState = {
  currentUser: null,
  users: loadUsers(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const user = state.users.find(
        (u) =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        throw new Error("Invalid credentials");
      }
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    addUser: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        name: string;
      }>
    ) => {
      const exists = state.users.some(
        (u) => u.username === action.payload.username
      );
      if (!exists) {
        const newUser: User = {
          id: crypto.randomUUID(),
          username: action.payload.username,
          password: action.payload.password,
          name: action.payload.name,
          role: "user",
        };
        state.users.push(newUser);
        saveUsers(state.users);
      } else {
        throw new Error("Username already exists");
      }
    },
  },
});

export const { login, logout, addUser } = authSlice.actions;
export default authSlice.reducer;
