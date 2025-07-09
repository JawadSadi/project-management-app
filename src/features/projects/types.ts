export interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignedTo: string;
  deadline: string;
}
export interface Project {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  tasks: Task[];
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
}
