import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../index.css";

const LoginPage2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/homePage");
  }, [isAuthenticated]);

  return (
    <div className="register flex flex-col min-h-screen rounded-lg md:p-8">
      <div className="p-8 mb-14">
        <h1 className="text-gray-100 text-3xl font-medium tracking-widest">
          Horizons Educative Corporation
        </h1>
      </div>
      <div className="p-8">
        <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
          Ingresa a la plataforma
        </h3>
        <h1 className="text-6xl text-white font-medium mb-2">
          Inicia sesión<span className="text-cyan-500">.</span>
        </h1>
        <form onSubmit={onSubmit} className="mt-8">
          <div className="max-w-lg mb-4">
            {signinErrors.map((error, i) => (
              <div
                className="bg-red-500 p-2 text-white text-center my-2"
                key={i}
              >
                {error}
              </div>
            ))}
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Correo"
            />
            {errors.email && (
              <p className="text-red-500">El correo es requerido </p>
            )}
          </div>

          <div className="max-w-lg mb-4">
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">La contraseña es requerida </p>
            )}
          </div>
          <div className="max-w-lg flex justify-center md:justify-end mb-6">
            
          </div>
          <div className="max-w-lg">
            <button
              type="submit"
              className="bg-cyan-600 text-white w-full py-3 px-4 rounded-full hover:bg-cyan-700 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage2;
