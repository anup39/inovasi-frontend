import { useState } from "react";

function Avaibility() {
  const [selectedTitle, setSelectedTitle] = useState(0);
  const titles = ["Palm Oil", "Rubber", "Soy", "Cacao", "Coffee"];
  const [showLowerBoxes, setShowLowerBoxes] = useState(true);

  // @ts-ignore
  const handleTitleClick = (index) => {
    setSelectedTitle(index);
    setShowLowerBoxes(false);
    setTimeout(() => {
      setShowLowerBoxes(true);
    }, 100);
  };

  return (
    <div className="mx-2 md:mx-10 lg:mx-20 my-5 md:my-16 bg-white p-10 rounded-3xl middle:rounded-[30px]">
      <div className="space-y-4">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-center">
          Agriplot Global availability
        </h1>
        <p className="font-normal text-xl md:text-2xl text-center text-subTextHome">
          How significant are Agriplot datasets in terms of global coverage
        </p>
      </div>
      <div className="flex lg:flex-col items-center justify-center py-5 md:py-10 lg:py-24 w-full">
        <div className="flex scale-90 md:scale-100 flex-col lg:flex-row gap-7 xl:gap-[30px] w-full items-center justify-center">
          {titles.map((title, index) => (
            <div
              key={index}
              onClick={() => handleTitleClick(index)}
              className={`cursor-pointer flex justify-center items-center w-1/6 xl:w-[297px] xl:h-[64px] min-w-[130px] py-4 lg:py-2 ${
                selectedTitle === index
                  ? "bg-gradient-to-r from-footerHeading to-parrot text-white transition-all delay-75 ease-out font-semibold "
                  : "bg-bgPage text-semiBlackText"
              } rounded-lg `}
            >
              <h1 className="text-center">{title}</h1>
            </div>
          ))}
        </div>
        <div className="h-1 hidden lg:block bg-boxDivider w-full my-5"></div>
        {/* lower boxes */}
        <div className="flex scale-75 md:scale-100 flex-col lg:flex-row gap-10 items-center justify-center lg:pt-20 w-full">
          <div
            className={`flex ${
              showLowerBoxes ? "opacity-100" : "opacity-0"
            } transition-opacity xl:w-[500px] xl:h-[159px] xl:py-[14px] xl:px-[40px] ease-in cursor-pointer hover:shadow-lg items-center justify-start gap-5 xl:gap-[38px] bg-bgPage px-4 py-4 rounded-[15px] min-w-[200px] w-3/4 lg:w-1/4`}
          >
            <div className="bg-countriesBg scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img
                className="scale-90 self-center"
                src="countries.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 xl:gap-[19px]">
              <p className="font-semibold text-xl text-graysBlue xl:text-[32px] xl:leading-[32px]">
                30
              </p>
              <p className="text-semiBlackText">Countries</p>
            </div>
          </div>

          <div
            className={`flex ${
              showLowerBoxes ? "opacity-100" : "opacity-0"
            } transition-opacity xl:w-[500px] xl:h-[159px] xl:py-[14px] xl:px-[40px] xl:gap-[38px] ease-in cursor-pointer hover:shadow-lg items-center justify-start gap-5 bg-bgPage px-4 py-4 rounded-[15px] min-w-[200px] w-3/4 lg:w-1/4`}
          >
            <div className="bg-borderGreen scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img className="scale-90 self-center" src="plots.svg" alt="" />
            </div>
            <div className="flex flex-col gap-2 xl:gap-[19px]">
              <p className="font-semibold text-xl text-graysBlue xl:text-[32px] xl:leading-[32px]">
                60M
              </p>
              <p className="text-semiBlackText">of Plots</p>
            </div>
          </div>
          <div
            className={`flex ${
              showLowerBoxes ? "opacity-100" : "opacity-0"
            } transition-opacity xl:w-[500px] xl:h-[159px] xl:py-[14px] xl:px-[40px] xl:gap-[38px] ease-in cursor-pointer hover:shadow-lg items-center justify-start gap-5 bg-bgPage px-4 py-4 rounded-[15px] min-w-[200px] w-3/4 lg:w-1/4`}
          >
            <div className="bg-plantedBg scale-75 lg:scale-100 h-20 aspect-square rounded-full flex items-center justify-center">
              <img
                className="scale-90 self-center"
                src="plantedarea.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 xl:gap-[19px]">
              <p className="font-semibold text-xl text-graysBlue xl:text-[32px] xl:leading-[32px]">
                2.6M
              </p>
              <p className="text-semiBlackText">ha of Planted Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avaibility;
