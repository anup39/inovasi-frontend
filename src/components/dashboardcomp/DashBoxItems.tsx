import '../../css/dashborad/DashBoardItem.css';

function DashBoxItems() {
  return (
    <div className='flex w-1/2 flex-col items-center py-7 gap-6 lg:flex-row justify-end '>
      <div className='bg-[#10767A] dashItems'>
        <div className='commonSizing '>
          <img src='Facilities.svg' alt='' />
          <p>Facilities</p>
          <p className='font-bold'>7</p>
        </div>
      </div>
      <div className='bg-[#018C79] dashItems'>
        <div className='commonSizing'>
          <img src='Refinery Supplier.svg' alt='' />
          <p>Refinery Supplier</p>
          <p className='font-bold'>124</p>
        </div>
      </div>
      <div className='bg-[#2A2A2A] dashItems'>
        <div className='commonSizing'>
          <img src='Mill Supplier.svg' alt='' />
          <p>Mill Supplier</p>
          <p className='font-bold'>324</p>
        </div>
      </div>
    </div>
  );
}
export default DashBoxItems;
