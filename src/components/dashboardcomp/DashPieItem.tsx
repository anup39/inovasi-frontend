import PieChartComp from "../commoncomp/PieChartComp";

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
    <div className="flex items-center justify-center py-1 gap-3 w-full lg:w-1/2 ">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-md my-auto w-1/3 lg:h-[266px]"
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
              />
            </div>{" "}
            <div
              style={{ height: "0.7px" }}
              className="bg-boxDivider hidden md:flex mb-1 w-full"
            ></div>
            <div className="hidden md:flex w-full max-h-full">
              {item.lowerBoxes.title.map((title, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center ${
                    index < item.lowerBoxes.title.length - 1
                      ? "border-r-[0.7px] border-boxDivider mx-auto"
                      : ""
                  } ${item.lowerBoxes.title.length === 2 ? "w-1/2" : "w-1/3"}`}
                >
                  <p
                    style={{ color: item.lowerBoxes.colors[index] }}
                    className=" text-[10px] md:text-[12px] font-normal lg:font-semibold "
                  >
                    {item.lowerBoxes.numbers[index]}
                  </p>
                  <p className=" text-[10px] ">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
