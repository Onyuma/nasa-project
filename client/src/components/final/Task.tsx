import { FaEdit, FaUserCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

interface TaskProps {
  completed: boolean;
  id: string;
  task: string;
  delAction(id: string): void;
}
const Task = ({ completed, id, task, delAction }: TaskProps) => {
  return (
    <div className="flex flex-row gap-3 bg-white justify-between items-center w-full h-full p-5 shadow-2xl rounded-lg">
      <div className="flex flex-row gap-5 items-center justify-center">
        {completed && <FaUserCheck className="text-gray-500 size-6" />}
        <p className={`text-2xl text-gray-500 ${completed && "line-through"} `}>
          {task}
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <span>
          <Link to={`edit/?id=${id}`}>
            <FaEdit className="text-gray-500 size-5" />
          </Link>
        </span>
        <span>
          <MdDelete
            className="text-gray-500 size-5"
            onClick={() => delAction(id)}
          />
        </span>
      </div>
    </div>
  );
};

export default Task;
