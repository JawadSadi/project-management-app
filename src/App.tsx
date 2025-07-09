import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";

import LoginPage from "./features/auth/LoginPage";
import AddProjectForm from "./features/projects/AddProjectForm";
import ProjectList from "./features/projects/projectList";
import LogoutButton from "./features/auth/LogoutButton";
import AddUserForm from "./features/auth/AddUserForm";

function App() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/projects"
        element={
          currentUser ? (
            <div className="max-w-2xl mx-auto mt-10 p-4">
              <LogoutButton />
              {currentUser.role === "admin" && (
                <>
                  <AddUserForm /> <AddProjectForm />
                </>
              )}
              <ProjectList />
            </div>
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }
      />
      <Route
        path="/"
        element={
          currentUser ? <Navigate to="/projects" /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
