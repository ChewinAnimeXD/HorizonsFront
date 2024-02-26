import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    signup,
    isAuthenticated,
    getUser,
    updateUser,
    errors: registerErrors,
  } = useAuth();
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleCheckboxChange = (program) => {
    // Verificar si ya está seleccionado
    if (selectedPrograms.includes(program)) {
      setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
    } else {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const onSubmit = handleSubmit((values) => {
    const dataValid = {
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      identificationNumber: values.identificationNumber,
      role: values.role,
      programs: selectedPrograms,
    };
    if (params.id) {
      updateUser(params.id, dataValid);
    } else {
      signup(dataValid);
    }
  
    navigate("/userPage");
    window.location.reload(); // Recargar la página
  });
  
  
  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        console.log(user);
        setValue("username", user.username);
        setValue("phone", user.phone);
        setValue("identificationNumber", user.identificationNumber);
        setValue("role", user.role);
        setSelectedPrograms(user.selectedPrograms || []);
        setValue("email", user.email);
        setValue("password", user.password);
      }
    }
    loadUser();
  }, []);

  return (
    <Navbar>
      <div className="bg-white rounded-lg p-6 ">
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
          <p className="font-medium text-xl pt-4 text-gray-800">
            Registro de usuarios
          </p>
        </div>
        <div className="flex h-[calc(130vh-100px)] items-center justify-center">
          <div className="bg-white max-w-md w-full p-10 rounded-md border border-gray-400">
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit}>
              <h1 className="text-2xl font-bold my-2">Registro</h1>

              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                placeholder="Nombre de usuario"
              />
              {errors.username && (
                <p className="text-red-500">El usuario es requerido </p>
              )}

              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                placeholder="Correo"
              />
              {errors.email && (
                <p className="text-red-500">El correo es requerido </p>
              )}

              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="text-red-500">La contraseña es requerida </p>
              )}

              <input
                type="tel"
                {...register("phone", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                placeholder="Número de teléfono"
              />
              {errors.phone && (
                <p className="text-red-500">
                  El número de teléfono es requerido{" "}
                </p>
              )}

              <input
                type="text"
                {...register("identificationNumber", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                placeholder="Número de identificación"
              />
              {errors.identificationNumber && (
                <p className="text-red-500">
                  El número de identificación es requerido{" "}
                </p>
              )}

              

              {/* Checkboxes para programas */}
              <div className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Ingles")}
                      checked={selectedPrograms.includes("Ingles")}
                    />
                    Inglés
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Frances")}
                      checked={selectedPrograms.includes("Frances")}
                    />
                    Francés
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Aleman")}
                      checked={selectedPrograms.includes("Aleman")}
                    />
                    Alemán
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Italiano")}
                      checked={selectedPrograms.includes("Italiano")}
                    />
                    Italiano
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("PreIcfes")}
                      checked={selectedPrograms.includes("PreIcfes")}
                    />
                    PreIcfes
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("PreUniversitario")}
                      checked={selectedPrograms.includes("PreUniversitario")}
                    />
                    PreUniversitario
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Kognit")}
                      checked={selectedPrograms.includes("Kognit")}
                    />
                    Kognit
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange("Nivelación")}
                      checked={selectedPrograms.includes("Nivelación")}
                    />
                    Nivelación
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          "Técnico laboral en guianza turística"
                        )
                      }
                      checked={selectedPrograms.includes(
                        "Técnico laboral en guianza turística"
                      )}
                    />
                    Técnico laboral en guianza turística
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          "Técnico laboral como asistente en marketing y comunicación"
                        )
                      }
                      checked={selectedPrograms.includes(
                        "Técnico laboral como asistente en marketing y comunicación"
                      )}
                    />
                    Técnico laboral como asistente en marketing y comunicación
                  </label>
                </div>
              </div>

              <select
                {...register("role", { required: true })}
                className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
              >
                <option value="" disabled hidden>
                  Selecciona un rol
                </option>
                <option value="student">Estudiante</option>
                <option value="teacher">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
              {errors.role && (
                <p className="text-red-500">El rol es requerido </p>
              )}

              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default RegisterPage;