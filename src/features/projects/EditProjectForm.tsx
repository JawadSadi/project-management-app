import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "./projectSlice";
import type { Project } from "./types";
import type { AppDispatch } from "../../app/store";

interface Props {
  project: Project;
  onClose: () => void;
}

function EditProjectForm({ project, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [deadline, setDeadline] = useState<string>("");

  const handleUpdate = () => {
    if (name.trim()) {
      dispatch(updateProject({ id: project.id, name, description }));
      onClose(); // بستن فرم ویرایش
    }
  };

  return (
    <div className="border p-4 rounded mb-4 bg-gray-100">
      <h3 className="font-bold mb-2">Edit Project</h3>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="block mb-2">
        Deadline:
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <div className="flex justify-between">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button className="text-red-500" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProjectForm;
