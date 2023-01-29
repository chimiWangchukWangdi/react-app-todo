import "../style/task-manager.css";
import Task from "../components/task";
import TaskForm from "../components/task-form";
import { useState, useEffect } from "react";
import { TaskProps } from "../models/todo";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
      );
      const data = await response.json();
      const newDatas = [];
      for (const key in data) {
        const newData = {
          id: key,
          ...data[key],
        };
        newDatas.push(newData);
      }
      setTasks(newDatas);
    }
    fetchData();
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add task +</button>
        <div className="taskManager__tasks">
          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.completed}
              title={task.title}
              description={task.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <TaskForm open={openAddModal} onClose={() => setOpenAddModal(false)} />
      )}
    </div>
  );
}

export default TaskManager;