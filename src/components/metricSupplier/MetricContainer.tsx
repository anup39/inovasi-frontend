function MetricContainer() {
  return (
    <div className='space-x-4 my-6 flex'>
      <div className='rounded-sm bg-white w-1/4 py-3 px-4'>
        <h1 className='font-semibold'>Supply Mill Region</h1>
        {/* Add piechart here */}
      </div>
      <div className='rounded-sm bg-white w-1/4 py-3 px-4'>
        <h1 className='font-semibold'>Supplier Type</h1>
        {/* Add piechart here */}
      </div>
      <div className='rounded-sm bg-white w-1/4 py-3 px-4'>
        <h1 className='font-semibold'>RSPO Certified</h1>
        {/* Add piechart here */}
      </div>
      <div className='rounded-sm bg-white w-1/4 py-3 px-4'>
        <h1 className='font-semibold'>Supplier Risk</h1>
        {/* Add piechart here */}
      </div>
    </div>
  );
}
export default MetricContainer;
