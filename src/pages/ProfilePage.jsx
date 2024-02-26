import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useImage } from "../context/ImageContext";
import { RiPassPendingLine, RiMailLine } from "react-icons/ri";
import { PiPhoneCallBold } from "react-icons/pi";
import defaultImage from "../assets/foto.png"; // Ruta de tu imagen por defecto

const ProfilePage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { images, createImage, getImages } = useImage();

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        console.error("Debes seleccionar una imagen");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("userIdImage", id);

      await createImage(formData);
      await getImages();
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const getImagesCallback = useCallback(async () => {
    try {
      await getImages();
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  }, [getImages]);

  useEffect(() => {
    getImagesCallback();
  }, []);

  // Buscar la imagen correspondiente al ID proporcionado en la URL
  const selectedImage = images.find((img) => img.userIdImage === id);

  return (
    <>
      <Navbar>
        <div className="bg-white rounded-lg p-6 ">
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Perfil de usuario
            </p>
          </div>
          <div className="p-8 flex justify-center items-center">
            <div className="flex flex-col lg:flex-row sm:items-start md:items-center lg:w-full">
              <div className="lg:w-1/2 flex justify-center">
                <div className="max-w-[400px]">
                  <img
                    src={selectedImage ? selectedImage.image : defaultImage}
                    alt="Usuario"
                    className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] object-cover rounded-full"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </div>
              </div>

              <div className="lg:w-1/2 md:w-full bg-white max-w-md mx-auto md:max-w-2xl lg:max-w-4xl rounded-lg shadow-xl">
                <div className="bg-gray-900 rounded-t-lg flex items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6">
                  <h3 className="text-white text-lg font-semibold">
                    {user.username}
                  </h3>
                </div>

                <div className="px-6 py-4 flex flex-col gap-4 text-black">
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4" // Agrega un margen inferior
    />
    <button className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md" type="submit">Subir Imagen</button>
  </form>
</div>


                <div className="px-6 py-4 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold text-gray-800">
                    {user.role === "student"
                      ? "Estudiante"
                      : user.role === "teacher"
                      ? "Profesor"
                      : user.role === "admin"
                      ? "Administrador"
                      : "Rol Desconocido"}
                  </h1>
                  <p className="text-gray-500">
                    {user.programs.map((program, index) => (
                      <span key={index}>
                        {program}
                        {index < user.programs.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="flex items-center mt-4 text-gray-700">
                    <RiPassPendingLine className="h-6 w-6" />
                    <h1 className="px-2 text-sm font-bold">
                      Numero de identificación:{" "}
                    </h1>
                    {user.identificationNumber}
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <PiPhoneCallBold className="h-6 w-6" />
                    <h1 className="px-2 text-sm font-bold">Teléfono: </h1>
                    {user.phone}
                  </div>
                  <div className="flex items-center mt-4 text-gray-700">
                    <RiMailLine className="h-6 w-6" />
                    <h1 className="px-2 text-sm font-bold">Correo: </h1>
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default ProfilePage;
