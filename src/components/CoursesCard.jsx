import { GoPencil, GoTrash, GoListUnordered } from "react-icons/go";
import { useCourses } from "../context/CoursesContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function CoursesCard({ course }) {
  const { deleteCourse } = useCourses();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Materia</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Profesor</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">{course.name}</td>
              <td className="px-6 py-4">{course.teacher}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <button
                    className="text-red-500 text-xl cursor-pointer"
                    onClick={() => deleteCourse(course._id)}
                  >
                    <GoTrash />
                  </button>
                  <Link to={`/courses/${course._id}`}>
                    <GoPencil className="text-blue-500 text-xl cursor-pointer" />
                  </Link>
                  <Link to={`/infoCourses/${course._id}`}>
                    <GoListUnordered className="text-green-500 text-xl cursor-pointer" />
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesCard;
