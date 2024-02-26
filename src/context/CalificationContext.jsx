import { createContext, useContext, useState } from "react";
import {
  createCalificationRequest,
  deleteCalificationRequest,
  getCalificationsRequest,
  getCalificationRequest,
  updateCalificationRequest,
} from "../api/califications";


const CalificationContext = createContext();

export const useCalification = () => {
  const context = useContext(CalificationContext);
  if (!context) throw new Error("use Califications must be used within a Calification Provider");
  return context;
};

export function CalificationProvider({ children }) {
  const [califications, setCalifications] = useState([]);

  const getCalifications = async () => {
    try {
      const res = await getCalificationsRequest();
      setCalifications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCalification = async (id) => {
    try {
      const res = await deleteCalificationRequest(id);
      if (res.status === 204) setCalifications(califications.filter((calification) => calification._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  const createCalification = async (calification) => {
    try {
      const res = await createCalificationRequest(calification);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCalification = async (id) => {
    try {
      const res = await getCalificationRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCalification = async (id, calification) => {
    try {
      await updateCalificationRequest(id, calification);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <CalificationContext.Provider
      value={{
        califications,
        getCalifications,
        deleteCalification,
        createCalification,
        getCalification,
        updateCalification
      }}
    >
      {children}
    </CalificationContext.Provider>
  );
}
