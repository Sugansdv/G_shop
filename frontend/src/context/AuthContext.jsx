import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/* ---------- HOOK ---------- */
export const useAuth = () => useContext(AuthContext);


/* ---------- PROVIDER ---------- */
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  /* Load user from localStorage on app start */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ---------- LOGIN ---------- */
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem("user");
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