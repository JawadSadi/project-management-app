// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./features/auth/LoginPage";
import AddUserForm from "./features/auth/AddUserForm";
import UserList from "./features/auth/UserList";
import AddProjectForm from "./features/projects/AddProjectForm";

import { useSelector } from "react-redux";
import ProjectList from "./features/projects/projectList";
import type { RootState } from "./app/store";

function App() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/projects"
        element={currentUser ? <Layout /> : <Navigate to="/login" />}
      >
        {/* default project list */}
        <Route index element={<ProjectList />} />

        {/* admin-only routes */}
        {currentUser?.role === "admin" && (
          <>
            <Route path="add-user" element={<AddUserForm />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="add-project" element={<AddProjectForm />} />
          </>
        )}
      </Route>

      {/* default redirect */}
      <Route path="/" element={<Navigate to="/projects" />} />
    </Routes>
  );
}

export default App;
