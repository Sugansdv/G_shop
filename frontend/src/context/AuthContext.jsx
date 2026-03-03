import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (storedUser && token) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Invalid user JSON in localStorage");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  } else {
    setUser(null);
  }
}, []);

  /* ---------- LOGIN ---------- */
  const login = (userData, token) => {

    // Clear old data first (VERY IMPORTANT)
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Save new
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser(userData);
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {

    // Clear EVERYTHING
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}