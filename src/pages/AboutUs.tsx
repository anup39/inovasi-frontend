import { useState } from "react";
import FAQ from "../components/aboutuscomp/FAQ";
import BusinessColab from "../components/homepagecomp/BusinessColab";
import Footer from "../components/homepagecomp/Footer";

function AboutUs() {
  const [mobMenu, setMobMenu] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center h-[64px] justify-between w-[1731px] mx-auto mt-[25px]">
        <img
          className="w-[170px] scale-50 md:scale-75 lg:scale-100 h-[64px]"
          src="inovasilogo.svg"
          alt=""
        />
        <div className=" items-center gap-[40px] lg:gap-[72px] hidden md:flex font-normal text-[18px] text-footerHeading ">
          <button>Home</button>
          <button>Dashboard</button>
          <button>News</button>
          <button className="font-bold ">About</button>
          <button className="w-[152px] h-[50px] font-semibold shadow-lg bg-white rounded-lg">
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
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              HOME
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              FEATURES
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg ">
              NEWS
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              ABOUT
            </button>
          </div>
        </div>
      </div>
      {/* hero section */}
      <div className="flex flex-col gap-[74px] items-center justify-center rounded-[35px] text-center h-[878px] w-[1804px] bg-gradient-to-r from-footerHeading to-parrot mt-[50px] mx-auto text-white">
        <p className="text-[24px] font-semibold">Inovasi Agriplot</p>
        <p className="font-bold text-[48px] w-[874px]">
          Your Compliance Companion for EU Deforestation Regulations
        </p>
      </div>
      {/* paragraph */}
      <p className="w-[1263px] mt-[385px] h-[265px] font-normal leading-[43.2px] text-[32px] text-semiBlackText mx-[328px]">
        Inovasi Agriplot is a tech-driven dataset that developed by
        <span className="font-semibold"> Mosaix</span> and
        <span className="font-semibold"> Inovasi Digital</span> to provide
        companies with the deforestation-free supply chain information that is
        aligned with EU Deforestation Regulation. The data set contains in
        Inovasi Agriplot is measurable and verifiable to comply with EUDR
        requirements.
      </p>
      {/* FAQ */}
      <div className="w-[1263px] h-[698px] mt-[384px] mx-[328px]">
        <FAQ />
      </div>
      {/* business colab */}
      <div className="mt-[506px]">
        <BusinessColab />
      </div>
      {/* reach out to us */}
      <div className="mt-[362px] mx-[207px] w-[1506px] h-[457px]">
        <div
          style={{ color: "transparent" }}
          className="font-bold leading-[48.76px] text-center text-4xl text-transparent bg-gradient-to-r from-[#02C685] via-[#50B7A8] to-[#8ADF5E] bg-clip-text"
        >
          <p>Got questions?</p>
          <p>We've got answers. Reach out to us.</p>
        </div>
        <h1 className="pt-[90px] leading-[182.85px] text-[150px] text-center font-bold">
          INOVASI AGRIPLOT
        </h1>
        <div className="text-center pt-[90px]">
          <button className=" text-center  bg-gradient-to-r from-footerHeading to-parrot w-[152px] h-[50px] text-bold text-white rounded-lg">
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
