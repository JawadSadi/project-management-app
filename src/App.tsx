import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import AddProjectForm from "./features/projects/AddProjectForm";
import ProjectList from "./features/projects/projectList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/projects"
        element={
          <div className="max-w-2xl mx-auto mt-10 p-4">
            <AddProjectForm />
            <ProjectList />
          </div>
        }
      />
      <Route path="/" element={<Navigate to="/projects" />} />
    </Routes>
  );
}

export default App;
