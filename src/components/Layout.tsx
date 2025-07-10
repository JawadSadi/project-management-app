import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import AdminSidebar from "./AdminSideBar";
import LogoutButton from "../features/auth/LogoutButton";
import { Outlet } from "react-router-dom";

function Layout() {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isAdmin && <AdminSidebar />}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Project Manager</h1>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-700">
                👤 {user.name} ({user.role})
              </span>
            )}
            <LogoutButton />
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          {" "}
          <Outlet />
        </main>

        <footer className="text-center text-sm text-gray-400 mt-auto pb-4">
          &copy; 2025 - Your App
        </footer>
      </div>
    </div>
  );
}

export default Layout;
