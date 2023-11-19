import '../../css/dashborad/DashBoardItem.css';
import DashBoxItems from './DashBoxItems';
import DashPieItem from './DashPieItem';

function DashBoardItem() {
  return (
    <div className='gap-6 flex mx-3 justify-center'>
      <DashBoxItems />
      <DashPieItem />
    </div>
  );
}
export default DashBoardItem;
