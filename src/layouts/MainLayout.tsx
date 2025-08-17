import GlobalSheets from "@/providers/Sheets/GlobalSheets";
import useRouter from "@/hooks/apps/useRouter";
import { useInitQuery } from "@/hooks/auth/useInit";
import { useLocalStorageStore } from "@/stores/localStorage";
import { useUserStore } from "@/stores/user";
import * as React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC<React.PropsWithChildren> = () => {
  const router = useRouter();
  const { isWalkThrough } = useLocalStorageStore((store) => store);
  const { token } = useUserStore();

  useInitQuery();
  React.useEffect(() => {
    if (!isWalkThrough) router.push("/walkthrough");
    if (router.pathname == "/walkthrough" && isWalkThrough) router.push("/");
  }, [isWalkThrough, router.pathname, token]);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex-1 overflow-auto max-w-xl mx-auto w-full h-full overflow-y-auto relative">
        <Outlet />
        <GlobalSheets />
      </div>
    </div>
  );
};

export default MainLayout;
