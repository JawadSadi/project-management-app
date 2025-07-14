import { useState } from "react";
import type { Project } from "./types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  addTaskToProject,
  deleteTaskFromProject,
  updateTaskInProject,
  toggleTaskCompleted,
} from "./projectSlice";
import Countdown from "../../components/Countsdown";

interface Props {
  project: Project;
}

function TaskList({ project }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "undone">("all");
  const [assignedTo, setAssignedTo] = useState("");

  const users = useSelector((state: RootState) => state.auth.users);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isAdmin = currentUser?.role === "admin";

  const [deadline, setDeadline] = useState<string>("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(
        addTaskToProject({
          projectId: project.id,
          title: taskTitle,
          assignedTo,
          deadline,
        })
      );
      setTaskTitle("");
      setAssignedTo("");
      setDeadline("");
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

  const filteredTasks = project.tasks.filter((task) => {
    if (!isAdmin && task.assignedTo !== currentUser?.id) return false;
    if (filter === "done") return task.completed;
    if (filter === "undone") return !task.completed;
    return true;
  });

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-bold mb-2">Tasks</h4>

      <div className="flex gap-2 mb-3">
        <button
          className={`px-3 py-1 rounded border ${
            filter === "all" ? "bg-gray-200" : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === "undone" ? "bg-gray-200" : ""
          }`}
          onClick={() => setFilter("undone")}
        >
          Undone
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === "done" ? "bg-gray-200" : ""
          }`}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
      </div>

      {isAdmin && (
        <div className="flex gap-2 mb-3 flex-wrap">
          <input
            type="text"
            placeholder="New task"
            className="border p-2 flex-1 min-w-[200px]"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <select
            className="border p-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Assign to...</option>
            {users
              .filter((u) => u.role === "user")
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </select>
          <input
            type="date"
            className="border p-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // جلوگیری از انتخاب تاریخ گذشته
          />
          <button
            className="bg-blue-600 text-white px-3"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks for this filter.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`p-2 border rounded flex justify-between items-center ${
                task.completed ? "bg-green-50" : ""
              }`}
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
                    {!isAdmin && task.assignedTo === currentUser?.id && (
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
                    )}
                    <span
                      className={`${
                        task.completed ? "line-through text-green-600" : ""
                      }`}
                    >
                      {task.title}
                      {task.deadline && (
                        <div className="text-xs text-gray-500 mt-1">
                          Deadline: <Countdown targetDate={task.deadline} />
                        </div>
                      )}
                    </span>
                  </label>

                  {isAdmin && (
                    <span className="text-xs text-gray-500">
                      👤{" "}
                      {users.find((u) => u.id === task.assignedTo)?.name ||
                        "Unknown"}
                    </span>
                  )}

                  {isAdmin && !task.completed && (
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
                  )}
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
