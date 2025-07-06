import { useState } from "react";
import type { Project } from "./types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  addTaskToProject,
  deleteTaskFromProject,
  updateTaskInProject,
  toggleTaskCompleted,
} from "./projectSlice";

interface Props {
  project: Project;
}

function TaskList({ project }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTaskToProject({ projectId: project.id, title: taskTitle }));
      setTaskTitle("");
    }
  };

  const handleUpdateTask = () => {
    if (editingTaskId && editingTitle.trim()) {
      dispatch(
        updateTaskInProject({
          projectId: project.id,
          taskId: editingTaskId,
          newTitle: editingTitle,
        })
      );
      setEditingTaskId(null);
      setEditingTitle("");
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
              {editingTaskId === task.id ? (
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    className="border p-1 flex-1"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-500 text-white px-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="text-red-500 px-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <label className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        dispatch(
                          toggleTaskCompleted({
                            projectId: project.id,
                            taskId: task.id,
                          })
                        )
                      }
                    />
                    <span
                      className={`${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingTitle(task.title);
                      }}
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
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
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
