import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequest, deleteUserRequest, getUsersRequest, updateUserRequest, getUserRequest } from "../api/auth";
import Cookies from "js-cookie";
import axios from 'axios'; 

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería estar dentro del proveedor");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) setUsers(users.filter((user) => user._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };


    const signin = async (user) => {
      try {
        const res = await loginRequest(user);
        if (res.data && res.data.token) { 
          Cookies.set("token", res.data.token, { expires: 1 }); 
          const token = res.data.token;
          //localStorage.setItem("token", token)
          //axios.defaults.headers.common["authorization"] = localStorage.getItem("token");

         /* axios.get('https://backend-horizons.vercel.app/api', {
    withCredentials: true
});*/

          console.log("El token del front",token)
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          console.error("Validando Credenciales, Intenta de nuevo");
          setErrors(["Validando Credenciales, Intenta de nuevo"]);
        }
      } catch (error) {
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data);
        } else {
          setErrors([error.response.data.message]);
        }
      }
    };
    

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verityTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        loading,
        user,
        isAuthenticated,
        errors,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
