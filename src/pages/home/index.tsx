import Headers from "./components/Headers";
import Banner from "./components/Banner";
import ActivityCard from "./components/ActivityCard";
import SpendingOverview from "./components/SpendingOverview";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user";

const Home = () => {
  const { token, user } = useUserStore((store) => store);

  useEffect(() => {
    console.log({ token, user });
  }, []);
  return (
    <div className="p-4 flex flex-col gap-6 overflow-y-auto">
      <Headers />

      {/* BANNER */}
      <Banner />

      {/* Activity Card */}
      <ActivityCard />

      {/* Spending Overview */}
      <SpendingOverview />
    </div>
  );
};

export default Home;
