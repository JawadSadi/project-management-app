import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
