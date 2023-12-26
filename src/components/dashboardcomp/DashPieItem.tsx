import PieChartComp from "../commoncomp/PieChartComp";
// import PieChartCompUpdated from "../commoncomp/PieChartCompUpdated";

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
    <div className="flex items-center justify-center  gap-[10px] md:gap-[18px] lg:gap-[24px] xl:gap-[28px] lg:w-full middle:w-1/2 xl:w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md xl:w-[238px] h-[170px]  md:h-[266px]  lg:min-w-[175px] lg:max-w-[250px] md:min-w-[180px] max-w-[110px] min-w-[100px] lg:w-1/3 "
        >
          <div className="p-1 flex flex-col justify-center md:justify-between w-full items-center md:h-full">
            <div className="p-1 flex w-full justify-between items-center ">
              <h1 className="text-semiBlackText font-medium md:font-bold text-[8px] md:text-medium lg:text-sm">
                {item.name}
              </h1>
              <img
                className="scale-90 md:scale-100"
                src="moreinfo.svg"
                alt=""
              />
            </div>
            <div className="scale-[0.4] md:scale-100 ">
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
