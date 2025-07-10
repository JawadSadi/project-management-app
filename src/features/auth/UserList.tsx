// features/auth/UserList.tsx
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../app/store";
import { deleteUser, updateUser } from "./authSlice";

function UserList() {
  const users = useSelector((state: RootState) => state.auth.users);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const startEditing = (user: any) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      username: user.username,
      password: user.password,
    });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editingUserId!, ...formData }));
    setEditingUserId(null);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (!currentUser || currentUser.role !== "admin") return null;

  return (
    <div className="border p-4 mt-6 rounded shadow">
      <h3 className="font-bold mb-3">Users List</h3>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-3 rounded flex justify-between items-start"
          >
            {editingUserId === user.id ? (
              <div className="flex flex-col w-full gap-2">
                <input
                  className="border p-1"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className="border p-1"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <input
                  className="border p-1"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <p>
                  <strong>{user.name}</strong> ({user.role})
                </p>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
            )}

            {user.id !== currentUser.id && editingUserId !== user.id && (
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => startEditing(user)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
