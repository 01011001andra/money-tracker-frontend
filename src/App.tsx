import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
