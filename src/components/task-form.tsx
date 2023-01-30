import Modal from "./modal";
import "../style/task-form.css";
import { Form, Field } from "react-final-form";
import { TaskFormProps } from "../models/todo";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../state/selector";
import { useAppDispatch } from "../state/store";
import { editTodo, postTodo } from "../state/slice";

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onClose,
  id,
  toEditTitle,
  toEditDescription,
}) => {
  const dispatch = useAppDispatch();

  /* function to handle submitting the form */
  const handleSubmit = async (values: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
    status: boolean;
  }) => {
    try {
      /* if initialValues are present, update the task, otherwise add new task */
      if (id) {
        values.id = id;
        dispatch(editTodo(values));
      } else {
        dispatch(postTodo(values));
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
