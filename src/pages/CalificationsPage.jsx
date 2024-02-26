import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCalification } from "../context/CalificationContext";
import CalificationsCard from "../components/CalificationsCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function CalificationsPage() {
  const { getCalifications, califications } = useCalification();
  const { isAuthenticated, logout, user } = useAuth();
  const { idstudent } = useParams();
  const { idcourse } = useParams();

  useEffect(() => {
    getCalifications();
  }, []);
  
  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-gray-300 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Notas y comentarios
            </p>
          </div>
          
          {user.role !== "student" && (
            <div>
              <Link to={`/addCalification/${idcourse}/${idstudent}`}>
                <button className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700">
                  Agregar Calificación
                </button>
              </Link>
            </div>
          )}
          <div className="flex items-center">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
              {califications.map((calification) => (
                <CalificationsCard
                  calification={calification}
                  key={calification._id}
                />
              ))}
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default CalificationsPage;
