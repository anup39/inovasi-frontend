import "../../css/dashborad/DashBoardItem.css";
import PieChart from "./PieChart";
import pie_chart_api from "../../utils/constants";

function DashPieItem() {
  return (
    <div className="flex  flex-col w-1/2 items-center py-7 gap-6 lg:flex-row">
      <div className="bg-white dashItems ">
        <div>
          <div className="p-2">
            <h1 className="text-black font-bold">Supply Base Region</h1>
            <PieChart
              data={pie_chart_api.supplybaseregion}
              width_={180}
              height_={180}
            />
          </div>
        </div>
      </div>
      <div className="bg-white  dashItems">
        <div className="p-2">
          <h1 className="text-black font-bold">Supplier Type</h1>
          {/* Pie Chart Here */}
          <PieChart
            data={pie_chart_api.suppliertype}
            width_={180}
            height_={180}
          />
        </div>
      </div>
      <div className="bg-white  dashItems ">
        <div className="p-2 ">
          <h1 className="text-black font-bold">RSPO Certified</h1>

          <PieChart
            data={pie_chart_api.rspocertified}
            width_={180}
            height_={180}
          />
        </div>
      </div>
    </div>
  );
}
export default DashPieItem;
