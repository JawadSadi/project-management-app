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
      className="bg-red-600 text-white px-3 py-1 rounded absolute top-4 right-4"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
