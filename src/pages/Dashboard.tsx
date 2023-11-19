import Layout from "../components/commoncomp/Layout";
import DashBoardItem from "../components/dashboardcomp/DashBoardItem";
import MapSection from "./MapSection";

export default function Dashboard() {
  return (
    <Layout>
      <DashBoardItem />
      <div className="w-[80vw]">
        <MapSection />
      </div>
    </Layout>
  );
}
