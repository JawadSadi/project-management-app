import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import Button from "../../components/Button";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Button
      label="Logout"
      onClick={handleLogout}
      className="text-red-800 font-bold hover:text-black"
    />
  );
}

export default LogoutButton;
