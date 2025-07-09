import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "./authSlice";
import type { RootState } from "../../app/store";

function AddUserForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  const handleAddUser = () => {
    try {
      dispatch(addUser({ username, password, name }));
      setMessage("User added successfully");
      setUsername("");
      setPassword("");
      setName("");
    } catch (err) {
      setMessage(`Username already exists,${err}`);
    }
  };

  return (
    <div className="border p-4 mb-6 rounded shadow">
      <h3 className="font-bold mb-2">Add New User</h3>
      {message && <p className="text-sm text-blue-600 mb-2">{message}</p>}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleAddUser}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </div>
  );
}

export default AddUserForm;
