import MapSection from "../../pages/MapSection";
import Layout from "../commoncomp/Layout";

function Reporting() {
  return (
    <div className="overflow-hidden ">
      <Layout>
        <div className="border-[15px] border-white rounded-md m-3 h-[500px]">
          <MapSection />
        </div>
      </Layout>
    </div>
  );
}
export default Reporting;
