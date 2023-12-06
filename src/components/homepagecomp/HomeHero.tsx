import { useNavigate } from "react-router-dom";
function HomeHero() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-x-hidden">
      <div className="flex justify-between pt-10 px-10 mb-10 ">
        <img className="w-[170px] h-[64px]" src="inovasilogo.svg" alt="" />
        <div className="flex items-center gap-10 z-10">
          <button className="font-bold text-creamGray">Home</button>
          <button className="font-normal text-creamGray">Features</button>
          <button className="font-normal text-creamGray">News</button>
          <button className="font-normal text-creamGray">About</button>

          <button className="text-footerHeading h-[50px] bg-white py-0 px-5 rounded-lg font-semibold">
            Get in touch
          </button>
        </div>
      </div>
      <div className=" py-56 text-center md:text-left px-16 w-screen z-10 space-y-6 overflow-x-hidden">
        {/* this bg */}
        <div className="hidden lg:block absolute top-4 right-0  w-[650px] h-[900px] rounded-l-xl bg-gradient-to-r from-footerHeading to-parrot z-0 "></div>

        <img
          className="absolute scale-75 ml-[100%] top-12 -right-36 z-99"
          src="heroIpad.png"
          alt=""
        />
        <h1 className="max-w-xs text-2xl font-bold">
          Ensure Compliance Regulation Effortlessly with Agriplot's Due
          Diligence System
        </h1>
        <p className="max-w-md text-homeSubText">
          Introducing the Agriplot Due-Diligence system: Your Partner for
          Compliance with EU Deforestation Regulation.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white bg-gradient-to-r from-footerHeading to-parrot px-5 py-2 rounded-lg"
          >
            Demo
          </button>
          <button className="text-homeBtnText px-5 py-2 rounded-lg border-2 border-greenLantern">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomeHero;
