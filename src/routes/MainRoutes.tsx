import { lazy } from "react";
import Loadable from "@/components/Loadable";
import NavigationLayout from "@/layouts/NavigationLayout";

// render
// import Home from "@/pages/home";
// import TransactionPage from "@/pages/transaction";
// import Report from "@/pages/report";
// import Setting from "@/pages/setting";

// render - lazy
const Home = Loadable(lazy(() => import("@/pages/home/index")));
const TransactionPage = Loadable(
  lazy(() => import("@/pages/transaction/index"))
);
const Report = Loadable(lazy(() => import("@/pages/report/index")));
const Setting = Loadable(lazy(() => import("@/pages/setting/index")));

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
