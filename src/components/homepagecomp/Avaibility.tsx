import { useState } from "react";

function Avaibility() {
  const [selectedTitle, setSelectedTitle] = useState(0);
  const titles = ["Palm Oil", "Rubber", "Soy", "Cacao", "Coffee"];

  return (
    <div className="mx-2 md:mx-10 lg:mx-20 my-5 md:my-16 bg-white p-10 rounded-3xl">
      <div className="space-y-4">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-center">
          Agriplot Global availability
        </h1>
        <p className="font-normal text-xl md:text-2xl text-center text-subTextHome">
          How significant are Agriplot datasets in terms of global coverage
        </p>
      </div>
      <div className="flex lg:flex-col items-center justify-center py-5 md:py-10 lg:py-24 w-full">
        <div className="flex scale-90 md:scale-100 flex-col lg:flex-row gap-7 w-full items-center justify-center">
          {titles.map((title, index) => (
            <div
              key={index}
              onClick={() => setSelectedTitle(index)}
              className={`cursor-pointer w-1/6 min-w-[130px] py-4 lg:py-2 ${
                selectedTitle === index
                  ? "bg-gradient-to-r from-footerHeading to-parrot text-white font-semibold "
                  : "bg-bgPage text-semiBlackText"
              } rounded-lg `}
            >
              <h1 className="text-center">{title}</h1>
            </div>
          ))}
        </div>
        <div className="h-1 hidden lg:block bg-boxDivider w-full my-5"></div>
        <div className="flex scale-75 md:scale-100 flex-col lg:flex-row gap-10 items-center justify-center lg:pt-20 w-full">
          <div className="flex  items-center justify-start gap-5 bg-bgPage px-4 py-4 rounded-lg min-w-[200px] w-3/4 lg:w-1/4">
            <div className="bg-countriesBg scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img
                className="scale-90 self-center"
                src="countries.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">30</p>
              <p className="text-semiBlackText">Countries</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-5 bg-bgPage px-2 py-4 rounded-lg min-w-[200px] w-3/4 lg:w-1/4">
            <div className="bg-countriesBg scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img className="scale-90 self-center" src="plots.svg" alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">60M</p>
              <p className="text-semiBlackText">of Plots</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-5 bg-bgPage px-4 py-4 rounded-lg min-w-[200px] w-3/4 lg:w-1/4">
            <div className="bg-countriesBg scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img
                className="scale-90 self-center"
                src="plantedarea.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">2.6M</p>
              <p className="text-semiBlackText">ha of Planted Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avaibility;
