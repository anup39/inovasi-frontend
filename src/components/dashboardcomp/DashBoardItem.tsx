import DashBoxItems from "./DashBoxItems";
import DashPieItem from "./DashPieItem";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface DashboardItemProps {
  map: Map | null;
}

const DashBoardItem: React.FC<DashboardItemProps> = ({ map }) => {
  return (
    <div className="gap-3 w-full flex flex-col items-center lg:flex-row mx-3 my-5 justify-center">
      <DashBoxItems map={map} />
      <DashPieItem />
    </div>
  );
};
export default DashBoardItem;
