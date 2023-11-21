import "../../css/dashborad/DashBoardItem.css";
import PieChart from "./PieChart";

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
    <div className="flex flex-col w-1/2 items-center py-7 gap-6 lg:flex-row">
      {items.map((item) => (
        <div key={item.id} className="bg-white dashItems">
          <div>
            <div className="p-2">
              <h1 className="text-black font-bold">{item.name}</h1>

              <PieChart data={item} width_={180} height_={180} />
              {/* <Box
                sx={{
                  marginLeft: "40%",
                  marginTop: "30%",
                }}
              >
                <CircularProgress sx={{ color: "#2A2A2A" }} />
              </Box> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashPieItem;
