import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && role) {
      setUser({
        token,
        role,
        name,
        email,
      });
    }
  }, []);

  const login = (data) => {
    // Save in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);

    // Save in React state
    setUser({
      token: data.token,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
