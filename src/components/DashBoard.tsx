function DashBoard() {
  return (
    <div className='flex gap-6 py-7 justify-center px-3'>
      <div className='bg-[#10767A] rounded-md items-center text-white p-5  w-1/6 '>
        <div className=' py-[10.25%]'>
          <img className='w-10 pb-10' src='src\assets\Facilities.svg' alt='' />
          <p className=' pb-10'>Facilities</p>
          <p className='font-bold'>7</p>
        </div>
      </div>
      <div className='bg-[#018C79]  rounded-md items-start text-white p-5  w-1/6 '>
        <div className=' py-[10.25%] '>
          <img
            className='w-10 pb-10'
            src='src\assets\Refinery Supplier.svg'
            alt=''
          />
          <p className=' pb-10'>Refinery Supplier</p>
          <p className='font-bold'>124</p>
        </div>
      </div>
      <div className='bg-[#2A2A2A]  rounded-md items-start text-white p-5  w-1/6 '>
        <div className=' py-[10.25%] '>
          <img
            className='w-10 pb-10'
            src='src\assets\Mill Supplier.svg'
            alt=''
          />
          <p className=' pb-10'>Mill Supplier</p>
          <p className='font-bold'>324</p>
        </div>
      </div>
      <div className='bg-white  rounded-md items-start text-white p-5  w-1/6 '>
        <div className=' py-[10.25%] '>
          <h1 className='text-black font-bold'>Supply Base Region</h1>
          {/* Pie Chart Here */}
        </div>
      </div>
      <div className='bg-white  rounded-md items-start text-white p-5  w-1/6 '>
        <div className=' py-[10.25%] '>
          <h1 className='text-black font-bold'>Supplier Type</h1>
          {/* Pie Chart Here */}
        </div>
      </div>
      <div className='bg-white  rounded-md items-start text-white p-5  w-1/6 '>
        <div className=' py-[10.25%] '>
          <h1 className='text-black font-bold'>RSPO Certified</h1>
          {/* Pie Chart Here */}
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
