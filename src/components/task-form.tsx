import Modal from "./modal";
import "../style/task-form.css";
import { Form, Field } from "react-final-form";
import { TaskFormProps } from "../models/todo";

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onClose,
  id,
  toEditTitle,
  toEditDescription,
}) => {
  /* function to handle submitting the form */
  const handleSubmit = async (values: {
    title: string;
    description: string;
    completed?: boolean;
    created?: Date;
  }) => {
    try {
      /* if initialValues are present, update the task, otherwise add new task */
      if (id) {
        const response = await fetch(
          `https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              completed: values.completed,
              created: values.created,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } else {
        const response = await fetch(
          "https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              completed: false,
              created: new Date(),
            }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      }
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      modalLable={id ? "Edit Task" : "Add Task"}
      onClose={onClose}
      open={open}
    >
      <Form
        initialValues={{ title: toEditTitle, description: toEditDescription }}
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} className={id ? "editTask" : "addTask"}>
            <Field
              name="title"
              validate={(value) => (value ? undefined : "Required")}
            >
              {({ input, meta }) => (
                <div className={id ? "editTask input" : "addTask input"}>
                  <input {...input} type="text" placeholder="Enter title" />
                  {meta.touched && meta.invalid && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="description"
              validate={(value) => (value ? undefined : "Required")}
            >
              {({ input, meta }) => (
                <div className={id ? "editTask input" : "addTask input"}>
                  <textarea {...input} placeholder="Enter task description" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className={id ? "editTask button" : "addTask button"}>
              <button type="submit" disabled={submitting}>
                {id ? "Edit" : "Done"}
              </button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default TaskForm;