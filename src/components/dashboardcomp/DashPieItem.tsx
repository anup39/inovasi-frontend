import PieChartComp from "../commoncomp/PieChartComp";
import PieChartCompUpdated from "../commoncomp/PieChartCompUpdated";

function DashPieItem() {
  const items = [
    {
      id: 1,
      name: "Supply Base Region",
      selected: false,
      distinct: "country",
      lowerBoxes: {
        title: ["Category 1", "Category 2", "Category 3"],
        numbers: ["48", "22%", "30%"],
        colors: ["#FB9347", "#FBDE47", "#72E005"],
      },
    },
    {
      id: 2,
      name: "Supplier Type",
      selected: false,
      distinct: "type",
      lowerBoxes: {
        title: ["Category 1", "Category 2"],
        numbers: ["48", "22%"],
        colors: ["#10BD82", "#B8E500"],
      },
    },
    {
      id: 3,
      name: "RSPO Certified",
      selected: false,
      distinct: "rspo",
      lowerBoxes: {
        title: ["Category 1", "Category 2", "Category 3"],
        numbers: ["48", "22%", "30%"],
        colors: ["#10BD82", "#83DE60", "#B8E500"],
      },
    },
  ];

  const params = {
    estateids: [],
    geometry_wkt: "",
  };

  return (
    <div className="flex items-center justify-center  gap-[28px] ">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md w-[238px] lg:h-[266px]"
        >
          <div className="p-1 flex flex-col justify-between items-center h-full">
            <div className="p-1 flex w-full justify-between items-center">
              <h1 className="text-semiBlackText font-medium md:font-bold text-[8px] md:text-medium lg:text-sm">
                {item.name}
              </h1>
              <img
                className="scale-75 md:scale-100"
                src="moreinfo.svg"
                alt=""
              />
            </div>
            <div className="">
              <PieChartComp
                params={params}
                data={item}
                width_={180}
                height_={180}
                params_include={false}
                gradient_start={[159, 83]}
              />

              {/* <PieChartCompUpdated /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
