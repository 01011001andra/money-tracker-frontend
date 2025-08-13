// import { lazy } from "react";
// import Loadable from "@/components/Loadable";
import AuthLayout from "@/layouts/AuthLayout";
import WalkThrough from "@/components/WalkThrough";

// render - home
// const Login = Loadable(lazy(() => import("@/pages/login/index")));

// ==============================|| MAIN ROUTES ||============================== //

const AuthRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <WalkThrough />,
        },
      ],
    },
    { path: "*", element: <>Not Found</> },
  ],
};

export default AuthRoutes;
