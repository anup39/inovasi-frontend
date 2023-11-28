import { useState } from "react";

function Avaibility() {
  const [isActive, setIsActive] = useState("Palm");
  function handleClick(index: string) {
    setIsActive(index);
  }
  return (
    // container div
    <div className="scale-75 lg:scale-100 bg-semiBlack mx-0 lg:mx-9 px-5 lg:px-12 rounded-lg text-white text-center py-12 space-y-6">
      <div className="space-y-3">
        <h1 className="font-semibold text-3xl">Agriplot Global avaibility</h1>
        <p className="text-xs">
          How significant is Agriplot datasets on the global coverage
        </p>
      </div>
      {/* inner div */}
      <div className=" md:h-[500px] mx-auto flex md:flex-col py-3 rounded-lg ">
        {/* upper div with icons */}
        <div className=" md:h-[120px] lg:h-[130px] flex flex-col md:flex-row max-w-full gap-12 md:gap-5 justify-between items-center">
          <div
            onClick={() => handleClick("Palm")}
            className={`flex flex-col items-center gap-3 justify-center py-5 h-full  ${
              isActive === "Palm" ? "md:bg-darkGreen" : ""
            } px-8  md:rounded-t-lg cursor-pointer`}
          >
            <img className="h-10 w-10" src="palm.svg" alt="" />
            <p className={`${isActive === "Palm" ? "underline" : ""}`}>Palm</p>
          </div>
          <div
            onClick={() => handleClick("Rubber")}
            className={`flex flex-col items-center gap-3 justify-center py-5 h-full  ${
              isActive === "Rubber" ? "md:bg-darkGreen" : ""
            } px-8  md:rounded-t-lg cursor-pointer`}
          >
            <img className="h-10 w-10" src="rubber.svg" alt="" />
            <p className={`${isActive === "Rubber" ? "underline" : ""}`}>
              Rubber
            </p>
          </div>
          <div
            onClick={() => handleClick("Soy")}
            className={`flex flex-col items-center gap-3 justify-center py-5 h-full  ${
              isActive === "Soy" ? "md:bg-darkGreen" : ""
            } px-8 md:rounded-t-lg cursor-pointer`}
          >
            <img className="h-10 w-10" src="soy.svg" alt="" />
            <p className={`${isActive === "Soy" ? "underline" : ""}`}>Soy</p>
          </div>
          <div
            onClick={() => handleClick("Cocoa")}
            className={`flex flex-col items-center gap-3 justify-center py-5 h-full  ${
              isActive === "Cocoa" ? "md:bg-darkGreen" : ""
            } px-8 md:rounded-t-lg cursor-pointer`}
          >
            <img className="h-10 w-10" src="cocoa.svg" alt="" />
            <p className={`${isActive === "Cocoa" ? "underline" : ""}`}>
              Cocoa
            </p>
          </div>
          <div
            onClick={() => handleClick("Coffee")}
            className={`flex flex-col items-center gap-3 justify-center py-5 h-full ${
              isActive === "Coffee" ? "md:bg-darkGreen" : ""
            } px-8 md:rounded-t-lg cursor-pointer`}
          >
            <img className="h-10 w-10" src="coffee.svg" alt="" />
            <p className={`${isActive === "Coffee" ? "underline" : ""}`}>
              Coffee
            </p>
          </div>
        </div>
        {/* lower container for 3 details */}
        <div
          className={`bg-darkGreen md:h-[400px] flex flex-col md:flex-row gap-12 md:gap-0 w-full justify-center py-28 rounded-lg ${
            isActive === "Palm" ? "md:rounded-tl-none" : ""
          } ${isActive === "Coffee" ? "md:rounded-tr-none" : ""}`}
        >
          <div className="flex flex-col items-center mx-auto">
            <img
              className="pb-2 scale-75 md:scale-100"
              src="countries.svg"
              alt=""
            />
            <p className="font-bold text-2xl md:text-3xl">32</p>
            <p className="font-semibold text-xl md:text-2xl">Countries</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              className="pb-2 scale-75 md:scale-100"
              src="plots.svg"
              alt=""
            />
            <p className="font-bold text-2xl md:text-3xl">60M</p>
            <p className="font-semibold text-xl md:text-2xl">Countries</p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <img
              className="pb-2 scale-75 md:scale-100"
              src="haplots.svg"
              alt=""
            />
            <p className="font-bold text-2xl md:text-3xl">30M</p>
            <p className="font-semibold text-xl md:text-2xl">Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Avaibility;
