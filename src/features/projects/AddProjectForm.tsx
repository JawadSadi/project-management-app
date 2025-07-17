import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "./projectSlice";
import type { AppDispatch } from "../../app/store";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function AddProjectForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<string>("");

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addProject({ name, description, deadline }));
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="mb-4 p-4 border rounded bg-sky-200">
      <h3 className="font-bold mb-4">Add New Project</h3>
      <InputField value={name} onChange={setName} placeholder="Project name" />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-4 rounded "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="block mb-1">Deadline:</label>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border p-2 w-full mb-8 rounded"
      />
      <Button label="ADD PROJECT" onClick={handleAdd} />
    </div>
  );
}

export default AddProjectForm;
