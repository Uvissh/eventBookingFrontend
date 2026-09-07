import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
};

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;