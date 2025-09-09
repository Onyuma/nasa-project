import EditTask, { editAction, editLoader } from "./components/final/EditTask";
import TaskDashboard, {
  formAction,
  formLoader,
} from "./components/final/TaskDashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
function App() {
  // useEffect(() => {
  //   const loadTasks = async () => {
  //     try {
  //       const newTask = await fetchAllTasks();
  //       setTasks(newTask);
  //     } catch (e) {
  //       setTasks([]);
  //     }
  //   };
  //   loadTasks();
  // }, [tasks]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<TaskDashboard />}
          action={formAction}
          loader={formLoader}
        />
        <Route
          path="edit/"
          element={<EditTask />}
          loader={editLoader}
          action={editAction}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
