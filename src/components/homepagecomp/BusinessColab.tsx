import Marquee from "react-fast-marquee";

const logos = [
  "fujilogo.png",
  "nestelogo.png",
  "p&glogo.png",
  "aaklogo.png",
  "wilmarlogo.png",
  "unvlogo.png",
  "fujilogo.png",
  "nestelogo.png",
  "p&glogo.png",
  "aaklogo.png",
  "wilmarlogo.png",
  "unvlogo.png",
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
      <Marquee pauseOnHover={true}>
        <div className=" flex flex-row items-center overflow-hidden w-full min-w-full py-5 md:py-32">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="md:border-x flex flex-col items-center justify-center w-[120px] md:w-[200px] lg:[250px] h-16 md:h-32 lg:h-48 border-x-collabBorder"
            >
              <img
                className="w-[50px] lg:scale-90 lg:scale-100  md:w-3/5 px-1 md:px-10"
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
