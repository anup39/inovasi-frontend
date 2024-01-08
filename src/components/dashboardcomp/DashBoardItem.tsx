import DashBoxItems from "./DashBoxItems";
import DashPieItem from "./DashPieItem";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface DashboardItemProps {
  map: Map | null;
}

const DashBoardItem: React.FC<DashboardItemProps> = ({ map }) => {
  return (
    <div className="gap-[10px] md:gap-[20px] middle:gap-[24px] xl:gap-[28px] flex flex-col items-center middle:flex-row w-full pt-[10px] md:pt-[28px] justify-center">
      <DashBoxItems map={map} />
      <DashPieItem />
    </div>
  );
};
export default DashBoardItem;
