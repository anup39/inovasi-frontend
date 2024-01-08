import { useState } from "react";
import FAQ from "../components/aboutuscomp/FAQ";
import BusinessColab from "../components/homepagecomp/BusinessColab";
import Footer from "../components/homepagecomp/Footer";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const [mobMenu, setMobMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center h-[64px] justify-between max-w-[1731px] mx-auto mt-[25px]">
        <img
          className="w-[170px] scale-50 md:scale-75 lg:scale-100 h-[64px]"
          src="inovasilogo.svg"
          alt=""
        />
        <div className=" items-center gap-[40px] lg:gap-[72px] hidden md:flex font-normal text-[18px] text-footerHeading ">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button>News</button>
          <button onClick={() => navigate("/aboutus")} className="font-bold ">
            About
          </button>
          <button
            onClick={() => navigate("/getintouch")}
            className="w-[152px] h-[50px] font-semibold shadow-lg bg-white rounded-lg"
          >
            Get in touch
          </button>
        </div>
        {/* mobile menu */}
        <div
          onClick={() => setMobMenu(!mobMenu)}
          className="mr-14  flex md:hidden flex-col gap-2 border-4 rounded-lg cursor-pointer border-parrot px-4 py-2 font-bold"
        >
          MENU
          <div
            className={`${
              mobMenu ? "flex flex-col gap-4 " : "hidden"
            } absolute inset-0 top-20  left-0 w-screen h-full py-10 px-2  bg-gray-600 bg-opacity-80 text-white font-semibold `}
          >
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg"
            >
              HOME
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg"
            >
              DASHBOARD
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg ">
              NEWS
            </button>
            <button
              onClick={() => navigate("/aboutus")}
              className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg"
            >
              ABOUT
            </button>
          </div>
        </div>
      </div>
      {/* hero section */}
      <div className="flex flex-col gap-[74px] items-center justify-center rounded-[35px] text-center h-[600px] lg:h-[878px] max-w-[1804px] bg-gradient-to-r from-footerHeading to-parrot mt-[30px] lg:mt-[50px] mx-auto text-white">
        <p className="text-[19px] lg:text-[24px] font-semibold">
          Inovasi Agriplot
        </p>
        <p className="font-bold text-[24px] md:text-[30px] lg:text-[48px] max-w-[874px]">
          Your Compliance Companion for EU Deforestation Regulations
        </p>
      </div>
      {/* paragraph */}
      <p className="max-w-[1263px] mt-[100px] md:mt-[250px] lg:mt-[385px] md:h-[200px] lg:h-[265px] font-normal leading-[43.2px] text-[18px] md:text-[25px] lg:text-[32px] text-semiBlackText mx-[15px] md:mx-[100px] lg:mx-[328px]">
        Inovasi Agriplot is a tech-driven dataset that developed by
        <span className="font-semibold"> Mosaix</span> and
        <span className="font-semibold"> Inovasi Digital</span> to provide
        companies with the deforestation-free supply chain information that is
        aligned with EU Deforestation Regulation. The data set contains in
        Inovasi Agriplot is measurable and verifiable to comply with EUDR
        requirements.
      </p>
      {/* FAQ */}
      <div className="max-w-[1263px] h-[500px] lg:h-[698px] mt-[150px] md:mt-[250px] lg:mt-[384px] mx-[20px] md:mx-[150px] lg:mx-[328px]">
        <FAQ />
      </div>
      {/* business colab */}
      <div className=" mt-[450px] lg:mt-[506px]">
        <BusinessColab />
      </div>
      {/* reach out to us */}
      <div className="mt-[362px] mx-[20px] md:mx-[150px] lg:mx-[207px] max-w-[1506px] h-[250px] md:h-[350px] lg:h-[457px]">
        <div
          style={{ color: "transparent" }}
          className="font-bold leading-[48.76px] text-center text-xl md:text-2xl lg:text-4xl text-transparent bg-gradient-to-r from-[#02C685] via-[#50B7A8] to-[#8ADF5E] bg-clip-text"
        >
          <p>Got questions?</p>
          <p>We've got answers. Reach out to us.</p>
        </div>
        <h1
          style={{}}
          className="pt-[90px] bg-gradient-to-r from-footerHeading to-parrot inline-block text-transparent bg-clip-text leading-[50px] md:leading-[100px] lg:leading-[182.85px] text-[35px] md:text-[100px] lg:text-[150px] text-center font-bold mx-auto"
        >
          INOVASI AGRIPLOT
        </h1>
        <div className="text-center pt-[90px]">
          <button className="hover:animate-pulse hover:shadow-md text-center  bg-gradient-to-r from-footerHeading to-parrot w-[152px] h-[50px] text-bold text-white rounded-lg">
            Get in touch
          </button>
        </div>
      </div>
      {/* footer */}
      <div className="mt-[407px]">
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
