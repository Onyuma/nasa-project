import axios from "axios";

async function deleteTask(id: string) {
  console.log(id);
  // return axios.delete(`/api/v1/tasks/${id}`);
}
async function fetchAllTasks() {
  const students = (await axios.get("/planets?state=benue")).data;
  return students.planets;
}
async function fetchAllStudents() {
  const students = (await axios.get(`/planets`)).data;
  return students.planets;
}
async function createTask(taskData: { name: string }) {
  console.log(taskData);
  // const tasks = axios.post("/api/v1/tasks", taskData);
  return [
    {
      _id: "001",
      completed: true,
      name: "Onyuma John",
    },
  ];
}

async function getTask(id: string) {
  const task = (await axios.get(`/planets/${id.toLowerCase()}`)).data;
  return task.data;
}

async function updateTask(
  id: string,
  taskData: { _id: string; completed: boolean; name: string }
) {
  // return axios.patch(`/api/v1/tasks/${id}`, taskData);
  console.log(taskData, id);
  return {
    _id: "001",
    completed: true,
    name: "Onyuma John",
  };
}
export {
  createTask,
  deleteTask,
  fetchAllTasks,
  getTask,
  updateTask,
  fetchAllStudents,
};
