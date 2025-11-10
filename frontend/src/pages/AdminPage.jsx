import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Please login</p>;
  if (user.role !== "admin") return <h2>Access Denied</h2>;

  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          Logout
        </button>

      </header>
      <Dashboard isAdmin={true} />
    </div>
  );
}
