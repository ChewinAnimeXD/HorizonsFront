import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../context/CoursesContext";
import CoursesCard from "../components/CoursesCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { GoPencil, GoTrash, GoListUnordered } from "react-icons/go";

function CoursesPage() {
  const { getCourses, courses } = useCourses();
  const { isAuthenticated, logout, user } = useAuth();
  const { deleteCourse } = useCourses();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  useEffect(() => {
    getCourses();
  }, []);

  const handleDeleteConfirmation = (courseId) => {
    setCourseIdToDelete(courseId);
    setShowConfirmation(true);
  };

  const handleDeleteCourse = () => {
    if (courseIdToDelete) {
      deleteCourse(courseIdToDelete);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-gray-300 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Listado de cursos
            </p>
          </div>
          <div>
            {user.role === "admin" && (
              <div>
                <Link to="/addCourse">
                  <button className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700">
                    Agregar Curso
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Materia</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Profesor</th>
                  {user.role !== "student" && <th scope="col" className="px-6 py-4 font-medium text-gray-900">Acciones</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{course.name}</td>
                    <td className="px-6 py-4">{course.teacher}</td>
                    {user.role !== "student" && (
                      <td className="px-6 py-4">
                        <div className="flex justify-start gap-4">
                          {user.role === "admin" && (
                            <>
                              <button
                                className="text-red-500 text-xl cursor-pointer"
                                onClick={() => handleDeleteConfirmation(course._id)}
                              >
                                <GoTrash />
                              </button>
                              <Link to={`/courses/${course._id}`}>
                                <GoPencil className="text-blue-500 text-xl cursor-pointer" />
                              </Link>
                            </>
                          )}
                          <Link to={`/infoCourses/${course._id}`}>
                            <GoListUnordered className="text-green-500 text-xl cursor-pointer" />
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Navbar>
      {/* Confirmación de eliminación */}
      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icono de advertencia */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      ¿Estás seguro que deseas eliminar este curso?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDeleteCourse}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoursesPage;
