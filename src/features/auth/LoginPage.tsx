// LoginPage.tsx
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../app/store";

function LoginPage() {
  const users = useSelector((state: RootState) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleLogin = () => {
    if (!selectedUser) {
      setError("Please select a user");
      return;
    }

    try {
      dispatch(login({ username: selectedUser.username, password }));
      navigate("/projects");
    } catch {
      setError("Incorrect password");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <p className="mb-2 text-sm text-gray-600">Select a user:</p>
      <ul className="space-y-1 mb-4">
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => {
                setSelectedUserId(user.id);
                setError("");
              }}
              className={`w-full text-left px-3 py-1 rounded ${
                selectedUserId === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {user.name} ({user.role})
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <>
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white w-full py-2 rounded"
            onClick={handleLogin}
          >
            Login as {selectedUser.name}
          </button>
        </>
      )}

      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
    </div>
  );
}

export default LoginPage;
