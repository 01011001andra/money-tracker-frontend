import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import MainLayout from "@/layouts/MainLayout";

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        MainRoutes,
        AuthRoutes,
        { path: "*", element: <>Not Found</> },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME,
  }
);

export default router;
