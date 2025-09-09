import { createContext } from "react";

const TaskContext = createContext<
  {
    _id: string;
    completed: boolean;
    name: string;
  }[]
>([]);

export default TaskContext;
