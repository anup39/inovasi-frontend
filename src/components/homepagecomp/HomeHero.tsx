import { useNavigate } from "react-router-dom";
function HomeHero() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="flex justify-between pt-3 px-10 z-10 ">
        <img className="scale-75" src="inovasilogo.png" alt="" />
        <div className="flex gap-5">
          <button>Home</button>
          <button>Features</button>
          <button>News</button>
          <button>About</button>
          <button className="text-footerHeading bg-white py-2 px-5 rounded-lg">
            Get in touch
          </button>
        </div>
      </div>
      <div className=" py-56 text-center md:text-left px-16 w-screen z-10 space-y-6 overflow-x-hidden">
        {/* this bg */}
        <div className="absolute top-10 -right-20  w-[700px] h-[800px] rounded-xl bg-gradient-to-r from-footerHeading to-parrot z-0 "></div>

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
          <button className="text-white bg-gradient-to-r from-footerHeading to-parrot px-5 py-2 rounded-lg">
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
