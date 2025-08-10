import Headers from "./components/Headers";
import Banner from "./components/Banner";
import ActivityCard from "./components/ActivityCard";
import SpendingOverview from "./components/SpendingOverview";

const Home = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col gap-6 overflow-y-auto">
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
