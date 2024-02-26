import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  RiHome6Line,
  RiArrowLeftRightFill,
  RiArrowUpSLine,
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function HamburguerMenu({ children }) {
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
    <nav className="min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white fixed w-6/8 md:w-80 h-full border-r p-8 flex flex-col justify-between overflow-y-scroll transition-all lg:left-0 z-50 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Logo, infouser and Nav */}
        <div>
          {/* Logo */}
          <h1 className="text-2xl text-blue-950 uppercase font-bold mb-10">
            HORIZONS EDUCATIVE CORPORATION
          </h1>
          {/* Info user */}
          <div className="flex items-center gap-4 mb-10">
            <span className="bg-blue-100 py-2 px-[11px] rounded-full text-blue-700 font-medium">
              JT
            </span>
            <div>
              <p className="text-gray-400 text-sm">{user.role}</p>
              <h5 className="font-bold text-blue-950 text-lg">
                {user.username}
              </h5>
            </div>
          </div>

          {/* Menu */}
          <ul>
            <li>
              <Link
                to="/homePage"
                className="flex items-center gap-4 text-gray-500 py-2 px-4"
              >
                <RiHome6Line />
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-4 text-gray-500 py-2 px-4"
              >
                <RiHome6Line />
                Perfil
              </Link>
            </li>
            {user.role === "admin" && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 text-gray-500 py-2 px-4"
                  onClick={toggleSubMenu}
                >
                  <span className="flex items-center gap-4">
                    <RiArrowLeftRightFill />
                    Datos académicos
                  </span>
                  <RiArrowUpSLine />
                </a>
                {showSubMenu && (
                  <ul className="pl-8">
                    <Link
                      to="/add-task"
                      className="flex items-center gap-4 text-gray-500 py-2 px-4"
                    >
                      <RiHome6Line />
                      Cursos
                    </Link>
                    <li>
                      <Link
                        to="/tasks"
                        className="flex items-center gap-4 text-gray-500 py-2 px-4"
                      >
                        <RiHome6Line />
                        Agregar Cursos
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            {user.role === "teacher" && (
              <li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-between gap-4 text-gray-500 py-2 px-4"
                    onClick={toggleSubMenu}
                  >
                    <span className="flex items-center gap-4">
                      <RiArrowLeftRightFill />
                      Datos académicos
                    </span>
                    <RiArrowUpSLine />
                  </a>
                  {showSubMenu && (
                    <ul className="pl-8">
                      <Link
                        to="/add-task"
                        className="flex items-center gap-4 text-gray-500 py-2 px-4"
                      >
                        <RiHome6Line />
                        Cursos
                      </Link>
                    </ul>
                  )}
                </li>
              </li>
            )}
            {user.role === "student" && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 text-gray-500 py-2 px-4"
                  onClick={toggleSubMenu}
                >
                  <span className="flex items-center gap-4">
                    <RiArrowLeftRightFill />
                    Datos académicos
                  </span>
                  <RiArrowUpSLine />
                </a>
                {showSubMenu && (
                  <ul className="pl-8">
                    <Link
                      to="/add-task"
                      className="flex items-center gap-4 text-gray-500 py-2 px-4"
                    >
                      <RiHome6Line />
                      Cursos
                    </Link>
                    <li>
                      <Link
                        to="/tasks"
                        className="flex items-center gap-4 text-gray-500 py-2 px-4"
                      >
                        <RiHome6Line />
                        Historial Notas
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            {user.role === "admin" && (
              <li>
                <Link
                  to="/userPage"
                  className="flex items-center gap-4 text-gray-500 py-2 px-4"
                >
                  <RiHome6Line />
                  Administrar usuarios
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logout */}
        <ul>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 text-gray-500 py-2 px-4"
            >
              <RiLogoutCircleRLine />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-2 md:top-6 right-6 border p-3 rounded-full bg-white z-[9999]"
      >
        {showMenu ? <RiCloseLine className="text-blue-800"/> : <RiMenu3Line className="text-blue-800"/>}
      </button>

      {/* Header */}
      <header className="fixed lg:ml-80 bg-white w-full lg:w-[calc(100%-320px)] border-b">
        <div className="flex items-center gap-4 lg:justify-between p-4 md:p-8">
          <h1 className="text-xl  text-blue-950 md:text-3xl font-bold">
            Sistema Integrado de Registro Academico (Horizons)
          </h1>

          <button className="border text-blue-900 font-bold flex items-center gap-4 p-2 md:p-2 rounded-lg text-xs md:text-base">
            <Link
              to="/"
              onClick={() => {
                logout();
              }}
            >
              <RiLogoutCircleRLine />
              Salir
            </Link>
          </button>
        </div>
        <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-4">
          {/* Search */}
          <div className="col-span-3 p-4 flex items-center justify-between">
            <h1 className="text-blue-950 font-bold">
              Bienvenido {user.username}
            </h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="lg:ml-80 pt-28 md:pt-36 lg:pt-48 h-screen w-full lg:w-[calc(100%-300px)]  grid grid-cols-1 lg:grid-cols-1">
        <div> {children} </div>
      </main>
    </nav>
  );
}
