import { lazy } from "react";
import Loadable from "@/components/Loadable";
import NavigationLayout from "@/layouts/NavigationLayout";
import Transaction from "@/pages/transaction";
import Report from "@/pages/report";
import Profile from "@/pages/profile";

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
          path: "/",
          element: <Home />,
        },
        {
          path: "/transaction",
          element: <Transaction />,
        },
        {
          path: "/report",
          element: <Report />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    { path: "*", element: <>Not Found</> },
  ],
};

export default MainRoutes;
