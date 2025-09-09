/* eslint-disable react-refresh/only-export-components */
import { Form, NavLink, redirect, useLoaderData } from "react-router";
import EditTab from "../ui/EditTab";
import { getTask, updateTask } from "../../api/TasksApi";
import Button from "../ui/Button";

export async function editLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const task = await getTask(id!);
  console.log(id);
  console.log(task);
  return task;
}

export async function editAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const update = await updateTask(id!, {
    _id: id!,
    completed: String(formData.get("checkBox")) == "on" ? true : false,
    name: String(formData.get("task")),
  });

  if (update.completed === true) {
    throw redirect("/");
  }
}

const EditTask = () => {
  const task = useLoaderData<{
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
  }>();
  return (
    <>
      <div className="flex flex-col justify-between items-center bg-white  w-full h-fit p-7 shadow-2xl">
        <table className="table justify-center items-center w-full border-collapse">
          <tr className="flex justify-between w-full items-center text-[20px] text-amber-950 border-collapse">
            <th>Matric No:</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Major</th>
            <th>State of Origin</th>
            <th>LGA</th>
            <th>Phone Number</th>
            <th>NOK FullName</th>
            <th>NOK Phone Number</th>
          </tr>
          <tr className="flex justify-between w-full items-center text-[20px] text-amber-400 border-collapse">
            <th>{task.matricNumber}</th>
            <th>{task.fullName}</th>
            <th>{task.gender}</th>
            <th>{task.major}</th>
            <th>{task.state}</th>
            <th>{task.lga}</th>
            <th>{task.phoneNumber}</th>
            <th>{task.nokFullName}</th>
            <th>{task.nokPhoneNumber}</th>
          </tr>
        </table>
      </div>
      <div className="flex flex-col p-10 justify-center h-dvh items-center  self-center">
        <div className="flex flex-col  bg-white  w-fit h-fit p-7 shadow-2xl">
          <Form method="post">
            <h1 className="flex items-center justify-center text-2xl ">
              Edit Task
            </h1>
            <EditTab
              isId={true}
              tabName="Task ID"
              tabValue={task.matricNumber}
              name="id"
            />
            <EditTab tabName="Name" tabValue={task.fullName} name="task" />
            <EditTab
              tabName="Completed"
              checkBox={true}
              name="checkBox"
              completed={task.gender == "Male" ? true : false}
            />
            <div className="flex flex-row gap-6 p-6">
              <Button title={`Edit ${task.fullName}`} type="submit" />
            </div>
          </Form>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "decoration-orange-200" : "decoration-amber-400"
            }
          >
            <Button title={`Back to tasks`} type="delete" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default EditTask;
