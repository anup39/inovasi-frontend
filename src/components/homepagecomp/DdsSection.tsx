function DdsSection() {
  return (
    <div className='space-y-7 py-20 px-9 flex items-center flex-col lg:items-start'>
      <h1 className='text-center font-bold text-3xl max-w-xl lg:text-left'>
        Agriplot Due Dilligence System (DDS) Platform: How to use for reporting
      </h1>
      <p className='max-w-md text-center lg:text-left'>
        Agriplot's Due Diligence System simplifies agricultural compliance,
        making it effortless for your business.
      </p>
      <div className='relative w-full '>
        <video className='bg-black aspect-video h-auto  w-full' src=''></video>
        {/* need to maintain this play btn position */}
        <div className='absolute top-10'>
          <img src='../../../public/videoplayicon.svg' alt='' />
        </div>
      </div>
    </div>
  );
}
export default DdsSection;
