import { useLocalStorageStore } from "@/stores/localStorage";
import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainLayout: React.FC<React.PropsWithChildren> = () => {
  const { isWalkThrough } = useLocalStorageStore((store) => store);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(isWalkThrough);
    if (!isWalkThrough) navigate("/walkthrough");
    if (location.pathname == "/walkthrough" && isWalkThrough) navigate("/");
  }, [isWalkThrough, navigate]);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex-1 overflow-auto max-w-xl mx-auto w-full h-full overflow-y-auto relative">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
