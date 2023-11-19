import "../../css/dashborad/DashBoardItem.css";
import PieChart from "./PieChart";
import pie_chart_api from "../../utils/constants";

function DashBoardItem() {
  return (
    <div className="flex flex-col lg:flex-row py-7 justify-center gap-6 mx-3 ">
      <div className="bg-[#10767A] dashItems ">
        <div className="commonSizing ">
          <img className=" pb-10" src="src\assets\Facilities.svg" alt="" />
          <p className=" pb-10">Facilities</p>
          <p className="font-bold">7</p>
        </div>
      </div>
      <div className="bg-[#018C79] dashItems">
        <div className="commonSizing">
          <img
            className=" pb-10"
            src="src\assets\Refinery Supplier.svg"
            alt=""
          />
          <p className="pb-10">Refinery Supplier</p>
          <p className="font-bold">124</p>
        </div>
      </div>
      <div className="bg-[#2A2A2A] dashItems">
        <div className="commonSizing">
          <img className="pb-10" src="src\assets\Mill Supplier.svg" alt="" />
          <p className=" pb-10">Mill Supplier</p>
          <p className="font-bold">324</p>
        </div>
      </div>
      <div className="bg-white  dashItems">
        <div className="">
          <h1 className="text-black font-bold">Supply Base Region</h1>
          <PieChart
            data={pie_chart_api.supplybaseregion}
            width_={200}
            height_={200}
          />
        </div>
      </div>
      <div className="bg-white  dashItems">
        <div className="">
          <h1 className="text-black font-bold">Supplier Type</h1>
          {/* Pie Chart Here */}
          <PieChart
            data={pie_chart_api.suppliertype}
            width_={200}
            height_={200}
          />
        </div>
      </div>
      <div className="bg-white  dashItems ">
        <div className=" ">
          <h1 className="text-black font-bold">RSPO Certified</h1>
          {/* Pie Chart Here */}
          <PieChart
            data={pie_chart_api.rspocertified}
            width_={200}
            height_={200}
          />
        </div>
      </div>
    </div>
  );
}
export default DashBoardItem;
