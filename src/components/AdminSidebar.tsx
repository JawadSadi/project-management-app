import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-md border-r px-4 py-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>

      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/projects"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-blue-50 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`
          }
        >
          📁 Project List
        </NavLink>

        <NavLink
          to="/projects/add-user"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-blue-50 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`
          }
        >
          ➕ Add User
        </NavLink>

        <NavLink
          to="/projects/user-list"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-blue-50 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`
          }
        >
          👥 User List
        </NavLink>

        <NavLink
          to="/projects/add-project"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-blue-50 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700"
            }`
          }
        >
          🏗️ Add Project
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
