import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc.format("DD-MM_YYYY"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Agregar apuntes
            </p>
          </div>
          <div className="flex h-[calc(80vh-100px)] items-center justify-center">
            <div className="bg-white max-w-md w-full p-10 rounded-md border border-gray-400">
              <form onSubmit={onSubmit}>
                <label htmlFor="title"></label>
                <input
                  type="text"
                  name="title"
                  placeholder="Titulo"
                  {...register("title")}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                  autoFocus
                />

                <label htmlFor="description"></label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  placeholder="Descripcion"
                  {...register("description")}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                ></textarea>

                <label htmlFor="date"></label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md my-2 border border-gray-400"
                />

                <button className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md">
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

export default TaskFormPage;
