import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, AuthRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME,
});

export default router;
