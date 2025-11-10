import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../components/Dashboard";

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Please login</p>;

  return (
    <div>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "10px 20px"
      }}>
        <h1>User Dashboard</h1>

        <button
          onClick={() => {
            logout();
            window.location.href = "/"; // ✅ redirect to login
          }}
        >
          Logout
        </button>
      </header>

      <Dashboard isAdmin={false} />
    </div>
  );
}
