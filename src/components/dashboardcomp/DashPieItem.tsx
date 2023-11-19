import React, { useState } from "react";
import "../../css/dashborad/DashBoardItem.css";
import PieChart from "./PieChart";
import pie_chart_api from "../../utils/constants";

interface Item {
  id: number;
  name: string;
  selected: boolean;
}

function DashPieItem() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Supply Base Region",
      selected: false,
    },
    {
      id: 2,
      name: "Supplier Type",
      selected: false,
    },
    {
      id: 3,
      name: "RSPO Certified",
      selected: false,
    },
  ]);

  return (
    <div className="flex flex-col w-1/2 items-center py-7 gap-6 lg:flex-row">
      {items.map((item) => (
        <div key={item.id} className="bg-white dashItems">
          <div>
            <div className="p-2">
              <h1 className="text-black font-bold">{item.name}</h1>
              <PieChart
                data={
                  item.name === "Supply Base Region"
                    ? pie_chart_api.supplybaseregion
                    : item.name === "Supplier Type"
                    ? pie_chart_api.suppliertype
                    : item.name === "RSPO Certified"
                    ? pie_chart_api.rspocertified
                    : []
                }
                width_={180}
                height_={180}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
