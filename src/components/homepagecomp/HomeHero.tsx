import { useNavigate } from "react-router-dom";
function HomeHero() {
  const navigate = useNavigate();
  return (
    <div className=" p-6 flex flex-col lg:items-center mx-auto lg:flex-row lg:pb-20 mt=0 lg:mt-20">
      <div className="flex flex-col mb-8 lg:mb-0  space-y-7 ml-0 lg:space-y-10 lg:w-1/2  lg:ml-6 z-20">
        <h1 className="font-bold lg:max-w-lg text-3xl lg:text-4xl text-center lg:text-left">
          Ensure compliance regulation effortlessly with Agriplot's Due
          Diligenge System
        </h1>
        <p className="max-w-md mx-auto text-lg text-center lg:text-left lg:mt-0 lg:mx-0">
          Agriplot's Due Dilligence System simplifies agricultural compliance,
          making it effortless for your business.
        </p>
        <div className="flex items-center justify-center w-full space-x-4 lg:justify-start z-20">
          <button
            onClick={() => navigate("/dashboard")}
            className="py-2 px-5 bg-lightGreen text-white"
          >
            Demo
          </button>
          <button className="py-2 px-4 border border-black">Learn More</button>
        </div>
      </div>
      <img
        className="absolute top-[95px] opacity-20 left-[25%] z-5 scale-110 lg:top-[120px] lg:opacity-100 lg:left-[46%]"
        src="homeherobackground.png"
        alt=""
      />
      <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">
        <img
          className=" lg:top-32 lg:left-20 top-0 left-0 z-10 overflow-x-visible"
          src="homeherotablet.png"
          alt=""
        />
      </div>
    </div>
  );
}
export default HomeHero;
