import { lazy } from "react";
import Loadable from "@/components/Loadable";

// render
const Login = Loadable(lazy(() => import("@/pages/login/index")));
const WalkThrough = Loadable(lazy(() => import("@/components/WalkThrough")));
const AuthLayout = Loadable(lazy(() => import("@/layouts/AuthLayout")));

// ==============================|| MAIN ROUTES ||============================== //

const AuthRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/walkthrough",
          element: <WalkThrough />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ],
};

export default AuthRoutes;
