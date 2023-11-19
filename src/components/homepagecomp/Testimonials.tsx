function Testimonials() {
  return (
    <div className='flex items-center justify-center my-7 flex-col'>
      <div className='text-center space-y-6 py-6'>
        <h1 className='text-4xl font-bold'>Testimonials</h1>
        <p className='max-w-md'>
          Agriplot's Due Diligence System simplifies agricultural compliance,
          making it effortless for your business.
        </p>
      </div>
      <div className='flex'>
        <button>
          <img
            className='scale-[1.5] mr-10'
            src='public\prevTestimony.svg'
            alt=''
          />
        </button>
        <div className='border border-gray-300 border-1 flex p-7 max-w-3xl rounded-lg'>
          <img src='public\testimonyphoto.png' alt='' />
          <div className='p-7 space-y-5'>
            <p className=''>
              Agriplot's Due Diligence System has been a game-changer for our
              agricultural business. It's made compliance with regulations a
              breeze, saving us time and ensuring we stay on the right side of
              the law. We can't imagine managing our operations without it."
            </p>
            <h1 className='font-bold'>- John D., Farm Manager</h1>
          </div>
        </div>
        <button>
          <img
            className='scale-[1.5] ml-10'
            src='public\nextTestimony.svg'
            alt=''
          />
        </button>
      </div>
      <div className='space-x-3'>
        <button className='bg-gray-600 rounded-full w-3 h-3 mt-5 inline'></button>
        <button className='bg-gray-400 rounded-full w-3 h-3 mt-5 inline'></button>
        <button className='bg-gray-400 rounded-full w-3 h-3 mt-5'></button>
        <button className='bg-gray-400 rounded-full w-3 h-3 mt-5'></button>
      </div>
    </div>
  );
}
export default Testimonials;
