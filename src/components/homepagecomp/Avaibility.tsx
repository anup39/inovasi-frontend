import "../../css/homepage/Avaibility.css";

function Avaibility() {
  return (
    <div className="scale-75 lg:scale-100 bg-[#282828] mx-9 px-12 rounded-lg text-white text-center py-12 space-y-6">
      <h1 className="font-semibold text-3xl">Agriplot Global avaibility</h1>
      <p className="text-xs">
        How significant is Agriplot datasets on the global coverage
      </p>
      <div className="flex flex-row lg:flex-col ">
        <div className="flex gap-7 justify-around items-center mx-36 flex-col lg:flex-row">
          <div className="svgUpperDiv">
            <img src="../../../public/palm.svg" alt="" />
            <p>Palm</p>
          </div>
          <div className="svgUpperDiv">
            <img src="../../../public/rubber.svg" alt="" />
            <p>Rubber</p>
          </div>
          <div className="svgUpperDiv">
            <img src="../../../public/soy.svg" alt="" />
            <p>Soy</p>
          </div>
          <div className="svgUpperDiv">
            <img src="../../../public/cocoa.svg" alt="" />
            <p>Cocoa</p>
          </div>
          <div className="svgUpperDiv">
            <img src="../../../public/coffee.svg" alt="" />
            <p>Coffee</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-evenly bg-[#018C79] w-full lg:w-auto  mt-6 mb-14 mx-0 lg:mx-56 gap-20 lg:gap-0 py-28 rounded-xl">
          <div className="svgInnerDiv">
            <img src="public\countries.svg" alt="" />
            <div>
              <h1 className="font-bold text-3xl">32</h1>
              <h1 className="font-semibold text-2xl">Countries</h1>
            </div>
          </div>{" "}
          <div className="svgInnerDiv">
            <img src="public\plots.svg" alt="" />
            <div>
              <h1 className="font-bold text-3xl">60M</h1>
              <h1 className="font-semibold text-2xl">of Plots</h1>
            </div>
          </div>{" "}
          <div className="svgInnerDiv">
            <img src="public\haplots.svg" alt="" />
            <div>
              <h1 className="font-bold text-3xl">30M</h1>
              <h1 className="font-semibold text-2xl">Ha of Plots</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Avaibility;
