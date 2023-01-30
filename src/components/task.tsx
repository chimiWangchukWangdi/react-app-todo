import "../style/task.css";
import { useState } from "react";
import TaskItem from "./todo";
import TaskForm from "./task-form";
import { TaskProps } from "../models/todo";

const Task: React.FC<TaskProps> = ({ id, title, description, completed }) => {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firebase */
  const handleCheckedChange = async () => {
    try {
      await fetch(
        `https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ completed: checked }),
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firebase */
  const handleDelete = async () => {
    try {
      await fetch(
        `https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`task ${checked && "task--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleCheckedChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <TaskForm
          open={open.edit}
          onClose={handleClose}
          id={id}
          toEditTitle={title}
          toEditDescription={description}
        />
      )}
    </div>
  );
};

export default Task;
