export const mockUsers = [
  { id: "1", name: "Admin", role: "admin" },
  { id: "2", name: "Ali", role: "user" },
  { id: "3", name: "Fatima", role: "user" },
] as const;

export type Role = "admin" | "user";

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: Role;
}
