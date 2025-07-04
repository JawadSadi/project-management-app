import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "./projectSlice";
import type { AppDispatch } from "../../app/store";

function AddProjectForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addProject({ name, description }));
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <h3 className="font-bold mb-2">Add New Project</h3>
      <input
        type="text"
        placeholder="Project name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Project
      </button>
    </div>
  );
}

export default AddProjectForm;
