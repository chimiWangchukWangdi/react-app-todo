import Modal from "./modal";
import "../style/todo.css";

interface TaskItemProps {
  onClose: () => void;
  open: boolean;
  title: string;
  description: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  onClose,
  open,
  title,
  description,
}) => {
  return (
    <Modal modalLable="Task Item" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  );
};

export default TaskItem;
