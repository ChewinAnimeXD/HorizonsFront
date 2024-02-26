import { useForm } from "react-hook-form";
import { useCalification } from "../context/CalificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function AddCalifPage() {
  const { register, handleSubmit, setValue } = useForm();

  const { createCalification, getCalification, updateCalification } =
    useCalification();
  const navigate = useNavigate();
  const params = useParams();
  const {idcourse} = useParams();

  console.log(idcourse);

  useEffect(() => {
    async function loadCalification() {
      if (params.id) {
        const calification = await getCalification(params.id);
        console.log(calification);
        setValue("name", calification.name);
        setValue("calification", calification.calification);
        setValue("comment", calification.comment);
       
      }
    }
    loadCalification();
  }, [params.idstudent]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      idstudent: params.idstudent, 
      course: params.idcourse,
    };
    
    if (params.id) {
      updateCalification(params.id, dataValid);
    } else {
      createCalification(dataValid);
    }

    navigate(`/courses`);
  });

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-gray-300 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Agregar calificación
            </p>
          </div>
          <div className="flex h-[calc(80vh-100px)] items-center justify-center">
            <div className="bg-white max-w-md w-full p-10 rounded-md border border-gray-400">
              <form onSubmit={onSubmit}>
                <label htmlFor="name" className="text-black">
                  Titulo
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Titulo"
                  {...register("name", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                  autoFocus
                />

                <label htmlFor="calification" className="text-black">
                  Calificacion
                </label>
                <textarea
                  name="calification"
                  id="calification"
                  rows="3"
                  placeholder="Calificacion"
                  {...register("calification", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                ></textarea>

                <label htmlFor="comment" className="text-black">
                  Comentario
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  rows="3"
                  placeholder="Comentario"
                  {...register("comment")}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                ></textarea>

                <button className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default AddCalifPage;
