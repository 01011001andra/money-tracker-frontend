import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import MaterialUiProvider from "./providers/MaterialUiProvider.tsx";

const App = () => {
  return (
    <MaterialUiProvider>
      <RouterProvider router={router}></RouterProvider>
    </MaterialUiProvider>
  );
};

export default App;
