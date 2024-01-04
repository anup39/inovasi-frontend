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
    <div className="flex items-center md:justify-center middle:justify-start md:w-full middle:w-1/2 gap-[10px] md:gap-[20px] middle:gap-[24px]  xl:gap-[28px] xl:w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-[20px] md:w-1/3 xl:w-[238px] middle:h-[266px] md:min-h-[200px] md:max-w-[280px] min-h-[100px] w-[95px]"
        >
          <div className="p-1 flex flex-col justify-center w-full items-center h-full">
            <div className="p-1 flex w-full justify-between items-center ">
              <h1 className="text-semiBlackText font-medium md:font-bold text-[8px] md:text-sm xl:text-[18px] xl:leading-[21.6px]">
                {item.name}
              </h1>
              <img
                className="scale-90 md:scale-100 cursor-pointer"
                src="moreinfo.svg"
                alt=""
              />
            </div>
            <div className=" ">
              <PieChartComp
                params={params}
                data={item}
                width_={180}
                height_={180}
                params_include={false}
                gradient_start={[159, 83]}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
