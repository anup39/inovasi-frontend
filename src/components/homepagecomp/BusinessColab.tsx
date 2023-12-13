import Marquee from "react-fast-marquee";

const logos = [
  "partner1.png",
  "partner2.png",
  "partner3.png",
  "partner4.png",
  "partner5.png",
  "partner6.png",
  "partner7.png",
  "partner8.png",
  "partner9.png",
  "partner10.png",
  "partner11.png",
  "partner12.png",
  "partner13.png",
  "partner14.png",
  "partner15.png",
  "partner16.png",
  "partner17.png",
  "partner18.png",
  "partner19.png",
  "partner20.png",
];

function BusinessColab() {
  return (
    <div className="flex items-center flex-col justify-center py-5 px-4 md:px-0 md:py-16 lg:py-28 gap-4">
      <h1
        className="font-bold text-xl md:text-2xl lg:text-4xl text-center
      "
      >
        Businesses Colaborating with Us
      </h1>
      <p className="text-subTextHome text-center ">
        Listen to what our satisfied partners are saying
      </p>{" "}
      <Marquee pauseOnHover={true} speed={50}>
        <div className=" flex flex-row items-center overflow-hidden w-full min-w-full py-10 md:py-32">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="md:border-x flex flex-col items-center justify-center w-[120px] md:w-[200px] lg:[250px] h-16 md:h-32 lg:h-48 border-x-collabBorder"
            >
              <img
                className="w-[60px] md:scale-100 lg:scale-[1.3]  md:w-3/5 px-1 md:px-10"
                src={logo}
                alt=""
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default BusinessColab;
