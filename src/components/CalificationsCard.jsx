import { GoPencil, GoTrash } from "react-icons/go";
import { useCalification } from "../context/CalificationContext";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "../context/AuthContext";
dayjs.extend(utc);

function CalificationsCard({ calification }) {
  const { deleteCalification, updateCalification } = useCalification();
  const { idcourse, idstudent } = useParams(); // Obteniendo los parámetros de la URL
  const { user } = useAuth();

  // Verificando si la calificación pertenece al estudiante actual y al curso específico
  const isCalificationForStudentAndCourse = calification.user === idstudent && calification.course === idcourse;

  // Verificando si el usuario es un estudiante para mostrar todas las calificaciones del estudiante
  const isStudent = user.role === "student";

  // Si el usuario es un estudiante, mostrar todas las calificaciones del estudiante
  if (isStudent && calification.user === idstudent) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="overflow-x-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{calification.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500"><strong>Calificacion: </strong>{calification.calification}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500"><strong>Comentario: </strong> {calification.comment}</p>
          </div>
        </div>
      </div>
    );
  }

  // Si el usuario no es un estudiante, mostrar las calificaciones que coincidan con el curso
  if (!isCalificationForStudentAndCourse) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="overflow-x-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{calification.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500"><strong>Calificacion: </strong>{calification.calification}</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500"><strong>Comentario: </strong> {calification.comment}</p>
        </div>
        {user.role !== "student" && (
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Acciones</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <div className="flex justify-end gap-4">
                    <button
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => {
                        deleteCalification(calification._id);
                      }}
                    >
                      <GoTrash />
                    </button>
                    
                    <Link to={`/updateCalification/${calification._id}`}>
                      <GoPencil className="text-blue-500 text-xl cursor-pointer" />
                    </Link>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalificationsCard;
