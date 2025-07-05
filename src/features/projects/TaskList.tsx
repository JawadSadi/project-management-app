// src/features/projects/TaskList.tsx
import { useState } from "react";
import type { Project } from "./types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addTaskToProject, deleteTaskFromProject } from "./projectSlice";

interface Props {
  project: Project;
}

function TaskList({ project }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTaskToProject({ projectId: project.id, title: taskTitle }));
      setTaskTitle("");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-bold mb-2">Tasks</h4>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="New task"
          className="border p-2 flex-1"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-3" onClick={handleAddTask}>
          Add
        </button>
      </div>

      {project.tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks.</p>
      ) : (
        <ul className="space-y-2">
          {project.tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{task.title}</span>
              <button
                onClick={() =>
                  dispatch(
                    deleteTaskFromProject({
                      projectId: project.id,
                      taskId: task.id,
                    })
                  )
                }
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
