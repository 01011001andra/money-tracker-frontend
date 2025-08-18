import { lazy } from "react";
import Loadable from "@/components/Loadable";
import NavigationLayout from "@/layouts/NavigationLayout";
import Report from "@/pages/report";
import Setting from "@/pages/setting";
import TransactionPage from "@/pages/transaction";

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
          element: <TransactionPage />,
        },
        {
          path: "/report",
          element: <Report />,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
      ],
    },
  ],
};

export default MainRoutes;
