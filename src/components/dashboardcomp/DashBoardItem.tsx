import "../../css/dashborad/DashBoardItem.css";
import DashBoxItems from "./DashBoxItems";
import DashPieItem from "./DashPieItem";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface DashboardItemProps {
  map: Map | null;
}

const DashBoardItem: React.FC<DashboardItemProps> = ({ map }) => {
  return (
    <div className="gap-6 flex mx-3 justify-center">
      <DashBoxItems map={map} />
      <DashPieItem />
    </div>
  );
};
export default DashBoardItem;
