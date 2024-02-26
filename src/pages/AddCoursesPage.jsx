import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useCourses } from "../context/CoursesContext";

function AddCoursesPage() {
  const { getUsers, users, user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    createCourse,
    getCourse,
    updateCourse,
    errors: registerErrors,
  } = useCourses();
  const params = useParams();
  const navigate = useNavigate();

  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [teachers, setTeachers] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const teacherUsers = users.filter((user) => user.role === "teacher");
    setTeachers(teacherUsers);
  }, [users]);

  useEffect(() => {
    const map = {};
    users.forEach(user => map[user._id] = user);
    setUserMap(map);
  }, [users]);

  
  const onSubmit = handleSubmit(async (values) => {
    const dataValid = {
      name: values.name,
      teacher: values.teacher,
      students: Array.from(selectedStudents).map(studentId => ({
        username: userMap[studentId].username,
        idstudent: userMap[studentId]._id,
        email: userMap[studentId].email,
        phone: userMap[studentId].phone,
      })),
    };

    try {
      if (!values.teacher) {
        throw new Error('Debes seleccionar un profesor');
      }
      if (params.id) {
        await updateCourse(params.id, dataValid);
      } else {
        await createCourse(dataValid);
      }
      navigate("/courses");
    } catch (error) {
      console.error("Error:", error);
    }
  });

  useEffect(() => {
    async function loadCourse() {
      if (params.id) {
        const course = await getCourse(params.id);
        setValue("name", course.name);
        setValue("teacher", course.teacher);
        setSelectedStudents(new Set(course.selectedStudents || []));
      }
    }
    loadCourse();
  }, [params.id, getCourse, setValue]);

  return (
    <>
      <Navbar>
      <div className="bg-white rounded-lg p-6 ">
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Agregar Curso
            </p>
          </div>
        <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
          <div className="bg-white max-w-md w-full p-10 rounded-md border border-gray-400">
            <form onSubmit={onSubmit}>
              <label htmlFor="name">Nombre del Curso:</label>
              <input
                type="text"
                name="name"
                placeholder="Curso"
                {...register("name", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                autoFocus
              />
              {errors.name && (
                <span className="text-red-500">Este campo es requerido</span>
              )}

              <label htmlFor="teacher">Selecciona un usuario:</label>
              <select
                id="teacher"
                {...register("teacher", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
              >
                <option value="">Selecciona un profesor</option>
                {users
                  ?.filter((user) => user.role === "teacher")
                  .map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
              </select>

              <label>Selecciona estudiantes:</label>
              <table className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    ?.filter((user) => user.role === "student")
                    .map((student) => (
                      <tr key={student._id}>
                        <td>{student.username}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(student._id)}
                            onChange={() => {
                              setSelectedStudents((prevSelected) => {
                                const newSelected = new Set(prevSelected);
                                if (newSelected.has(student._id)) {
                                  newSelected.delete(student._id);
                                } else {
                                  newSelected.add(student._id);
                                }
                                return newSelected;
                              });
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <button className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md">
                Agregar
              </button>
            </form>
          </div>
        </div>
        </div>
      </Navbar>
    </>
  );
}

export default AddCoursesPage;
