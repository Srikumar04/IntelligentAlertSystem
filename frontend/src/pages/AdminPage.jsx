import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        <button onClick={logout}>Logout</button>
      </header>
      {user ? <Dashboard /> : <p>Please login</p>}
    </div>
  );
}
