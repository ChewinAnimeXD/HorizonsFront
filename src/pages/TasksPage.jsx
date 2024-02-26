import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";


function TasksPage() {
  const { userId } = useParams();
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks(userId); 
  }, [userId]); 

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border  border-gray-200 shadow-md m-5">
        <div className="bg-gray-200 p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-gray-800">
              Mis apuntes
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
            {tasks.map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default TasksPage;