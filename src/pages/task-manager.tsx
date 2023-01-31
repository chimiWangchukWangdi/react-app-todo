import "../style/task-manager.css";
import Task from "../components/task";
import TaskForm from "../components/task-form";
import { useState, useEffect } from "react";
import { TaskProps } from "../models/todo";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../state/store";
import { fetchTodoList } from "../state/slice";
import * as selectors from "../state/selector";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const dispatch = useAppDispatch();
  const todos = useSelector(selectors.selectTodos);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    dispatch(fetchTodoList());
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add task +</button>
        <div className="taskManager__tasks">
          {todos.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              status={task.status}
              title={task.title}
              description={task.description}
              created_at={task.created_at}
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
