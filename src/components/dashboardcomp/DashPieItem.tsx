import PieChartComp from "../commoncomp/PieChartComp";

function DashPieItem() {
  const items = [
    {
      id: 1,
      name: "Supply Base Region",
      selected: false,
      distinct: "country",
    },
    {
      id: 2,
      name: "Supplier Type",
      selected: false,
      distinct: "type",
    },
    {
      id: 3,
      name: "RSPO Certified",
      selected: false,
      distinct: "rspo",
    },
  ];

  const params = {
    estateids: [],
    geometry_wkt: "",
  };

  return (
    <div className="flex items-center py-1 gap-3 w-1/2">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md text-white my-auto lg:w-1/3 lg:h-[245px]"
        >
          <div className="p-1 flex flex-col justify-between items-center">
            <div className="p-1 flex w-full justify-between items-center">
              <h1 className="text-semiBlackText font-bold md:text-xs lg:text-sm">
                {item.name}
              </h1>
              <img className="" src="moreinfo.svg" alt="" />
            </div>
            <div className="lg:pt-2">
              <PieChartComp
                params={params}
                data={item}
                width_={180}
                height_={180}
                params_include={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
