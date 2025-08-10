import { lazy } from "react";
import Loadable from "@/components/Loadable";
import NavigationLayout from "@/layouts/NavigationLayout";

// render - home
const Home = Loadable(lazy(() => import("@/pages/home/index")));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <NavigationLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
    { path: "*", element: <>Not Found</> },
  ],
};

export default MainRoutes;
