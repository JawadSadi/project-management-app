import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { deleteProject } from "./projectSlice";

function ProjectList() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Project List</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <button
                  className="text-red-600"
                  onClick={() => dispatch(deleteProject(project.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
