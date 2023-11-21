import '../../css/homepage/Avaibility.css';

function Avaibility() {
  return (
    <div className='scale-75 lg:scale-100 bg-[#282828] mx-9 px-12 rounded-lg text-white text-center py-12 space-y-6'>
      <h1 className='font-semibold text-3xl'>Agriplot Global avaibility</h1>
      <p className='text-xs'>
        How significant is Agriplot datasets on the global coverage
      </p>
      <div className='flex flex-row lg:flex-col py-3 bg-[#018C79] rounded-lg'>
        <div className='upperContainer '>
          <div className='upperSvg '>
            <img src='public\palm.svg' alt='' />
            <p>Palm</p>
          </div>
          <div className='upperSvg'>
            <img src='public\rubber.svg' alt='' />
            <p>Rubber</p>
          </div>
          <div className='upperSvg'>
            <img src='public\soy.svg' alt='' />
            <p>Soy</p>
          </div>
          <div className='upperSvg'>
            <img src='public\cocoa.svg' alt='' />
            <p>Cocoa</p>
          </div>
          <div className='upperSvg'>
            <img src='public\coffee.svg' alt='' />
            <p>Coffee</p>
          </div>
        </div>
        <div className='innerSvgContainer flex flex-col justify-center'>
          <div className='innerSvg'>
            <img src='public\countries.svg' alt='' />
            <p className='paraNum'>32</p>
            <p className='paraText'>Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Avaibility;
