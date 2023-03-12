import { useEffect, useState, createContext, useContext } from "react"
import { login, logout, managedb } from '../api/firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    managedb((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user, uid: user && user.uid }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthApi = () => {
  return useContext(AuthContext);
}

export default AuthProvider;