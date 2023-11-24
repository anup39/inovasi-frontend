import PieChartComp from "./PieChartComp";

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

  return (
    <div className="flex items-center py-1 gap-6 lg:flex-row">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-md text-white my-auto">
          <div>
            <div className="p-1">
              <h1 className="text-black font-bold">{item.name}</h1>

              <PieChartComp data={item} width_={180} height_={180} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
