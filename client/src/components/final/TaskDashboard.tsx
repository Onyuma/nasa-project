/* eslint-disable react-refresh/only-export-components */
import { Form } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import Task from "./Task";
import {
  createTask,
  deleteTask,
  fetchAllStudents,
  fetchAllTasks,
} from "../../api/TasksApi";
import Select from "../ui/Select";
import nigerian from "nigerian-states-and-lgas";

export async function formAction({ request }: { request: Request }) {
  const formData = (await request.formData()).get("task");
  const data = await createTask({ name: String(formData) });
  console.log(data);
  await fetchAllTasks();
}

export async function formLoader() {
  const tasks = await fetchAllTasks();
  return tasks;
}

const TaskDashboard = () => {
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState("");

  const [students, setStudents] = useState<
    {
      s_no: string;
      matricNumber: string;
      fullName: string;
      gender: string;
      major: string;
      state: string;
      lga: string;
      email: string;
      phoneNumber: string;
      address: string;
      nokFullName: string;
      nokPhoneNumber: string;
    }[]
  >([]);

  const [filterStudent, setFilterStudent] = useState<
    {
      s_no: string;
      matricNumber: string;
      fullName: string;
      gender: string;
      major: string;
      state: string;
      lga: string;
      email: string;
      phoneNumber: string;
      address: string;
      nokFullName: string;
      nokPhoneNumber: string;
    }[]
  >([]);

  async function handleDelete(id: string) {
    try {
      const delTask = await deleteTask(id);
      alert(delTask);
      const newTasks = students.filter((task) => task.matricNumber !== id);
      setStudents(newTasks);
    } catch (e) {
      alert(e);
    }
  }
  function handleChange(value: string) {
    if (value.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  useEffect(() => {
    async function fetchStudents() {
      const students = await fetchAllStudents();
      setStudents(students);
    }
    fetchStudents();
  }, []);

  return (
    <>
      <div className="flex flex-col p-10 justify-start h-dvh items-center  self-center">
        <Form method="post">
          <div className="flex flex-col gap-5 bg-white justify-center items-center w-2xl h-fit p-7 shadow-2xl">
            <h1 className="text-black text-4xl ">U21CS DASHBOARD</h1>
            <TypeAnimation
              deletionSpeed={19}
              sequence={[
                ...filterStudent.map((task) => task.fullName),
                "Create a new task",

                "Manage your tasks efficiently",

                "Manage your tasks productively",
              ]}
              wrapper="div"
              style={{ fontSize: "1.5em" }}
              speed={50}
              cursor={true}
              repeat={Infinity}
              className="text-gray-500 text-lg"
            />

            <div className="flex flex-col justify-between gap-4  items-center w-full ">
              <Input onChange={handleChange} />
              <Select
                options={nigerian.states()}
                onChange={(value) => {
                  setState(value);
                }}
                onClick={() => {
                  const filteredStudents = students.filter(
                    (student) => student.state == state
                  );
                  setFilterStudent(filteredStudents);
                }}
              />
              <Button title="Submit" type="submit" disabled={disabled} />
            </div>
          </div>
        </Form>
        <div className="grid grid-cols-3 mt-10 gap-4 h-fit justify-between">
          {filterStudent.length ? (
            filterStudent.map((task) => (
              <Task
                completed={task.gender == "Male" ? true : false}
                key={task.matricNumber}
                id={task.matricNumber}
                task={task.fullName}
                delAction={handleDelete}
              />
            ))
          ) : (
            <div className="flex items-center justify-center bg-amber-600 text-2xl text-white w-full h-fit p-10">
              No Student From The Specified State
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDashboard;
