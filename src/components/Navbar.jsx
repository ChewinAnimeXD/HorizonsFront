import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  RiArrowUpSLine,
  RiLogoutCircleRLine,
  RiMenu3Fill,
  RiCloseLine,
  RiHome6Line,
  RiArrowLeftRightFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar({ children, users }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  

  return (
    <div className="bg-[#f5f5f5]">
      {/* Sidebar */}
      <div
        className={`bg-[#1E1F24] fixed ${
          showMenu ? "-left-0" : "-left-full"
        } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all z-50`}
      >
        {/* Menu */}
        <div>
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-white uppercase font-bold text-2xl tracking-[4px]">
              HORIZONS EDUCATIVE CORPORATION
            </h1>
          </div>
          {/* Nav */}
          <nav>
            <div className="flex items-center gap-4 mb-10">
              
              <div>
                <p className="text-gray-400 text-sm">{user.role}</p>
                <h5 className="font-bold text-white text-lg">
                  {user.username}
                </h5>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  to="/homePage"
                  className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                >
                  <RiHome6Line />
                  Inicio
                </Link>
              </li>
              <li>
              <Link
                  to={`/profile/${user.id}`} // Aquí pasamos el ID del usuario al enlace del perfil
                  className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                >
                  <RiHome6Line />
                  Perfil
                </Link>

              </li>

              {user.role === "admin" && (
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    onClick={toggleSubMenu}
                  >
                    <span className="flex items-center gap-4">
                      <RiArrowLeftRightFill />
                      Mi espacio
                    </span>
                    <RiArrowUpSLine />
                  </a>
                  {showSubMenu && (
                    <ul className="pl-8">
                      <li>
                        <Link
                          to="/add-task"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Agregar Apuntes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tasks"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Ver Apuntes
                        </Link>
                      </li>
                    </ul>
                  )}
                  <li>
                    <Link
                      to="/courses"
                      className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    >
                      <RiHome6Line />
                      Administrar cursos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userPage"
                      className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    >
                      <RiHome6Line />
                      Administrar usuarios
                    </Link>
                  </li>
                </li>
              )}
              {user.role === "teacher" && (
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    onClick={toggleSubMenu}
                  >
                    <span className="flex items-center gap-4">
                      <RiArrowLeftRightFill />
                      Mi espacio
                    </span>
                    <RiArrowUpSLine />
                  </a>
                  {showSubMenu && (
                    <ul className="pl-8">
                      <li>
                        <Link
                          to="/add-task"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Agregar Apuntes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tasks"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Ver Apuntes
                        </Link>
                      </li>
                    </ul>
                  )}
                  <li>
                    <Link
                      to="/courses"
                      className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    >
                      <RiHome6Line />
                      Administrar cursos
                    </Link>
                  </li>
                </li>
              )}
              {user.role === "student" && (
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    onClick={toggleSubMenu}
                  >
                    <span className="flex items-center gap-4">
                      <RiArrowLeftRightFill />
                      Mi espacio
                    </span>
                    <RiArrowUpSLine />
                  </a>
                  {showSubMenu && (
                    <ul className="pl-8">
                      <li>
                        <Link
                          to="/add-task"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Agregar Apuntes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tasks"
                          className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                        >
                          <RiHome6Line />
                          Ver Apuntes
                        </Link>
                      </li>
                    </ul>
                  )}

                  <li>
                    <Link
                      to={`/califications/${user.id}`}
                      className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                    >
                      <RiHome6Line />
                      Historial Notas
                    </Link>
                  </li>
                </li>
              )}
            </ul>
          </nav>
        </div>
        {/* Logout */}
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                onClick={() => {
                  logout();
                }}
              >
                <RiLogoutCircleRLine />
                Salir
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Btn menu movile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 bg-[#1E1F24] ring-4 ring-[#141517] text-white text-xl p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>

      {/* Content */}
      <header className="lg:pl-80 md:pl-20 p-6 bg-[#2d2e35] flex justify-left border-b border-gray-500 ">
        <h1 className="text-xl text-white md:text-2xl font-bold ">
          Sistema Integrado de Registro Academico (Horizons)
        </h1>
      </header>
      <main className="bg-[#ffffff] lg:ml-80 lg:mt-10 md:pt-0 lg:pt-2 min-h-[80vh] w-full lg:w-[calc(96%-300px)] grid grid-cols-1 lg:grid-cols-1 border border-gray-300 shadow-lg">
        {/* Header */}
        <div>{children}</div>
      </main>
    </div>
  );
}
