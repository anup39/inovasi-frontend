function Testimonials() {
  return (
    <div className="flex flex-col py-5 md:py-20 lg:py-32 xl:py-60 px-0 md:px-14 gap-20">
      <div className="flex flex-col gap-3 xl:gap-[16px] text-center">
        <h1 className="font-bold text-3xl text-[#0C0047] middle:text-[40px] middle:leading-[48.76px]">
          People Talk About Us
        </h1>
        <p className="text-subTextHome font-normal middle:text-[20px] middle:leading-[24px]">
          Testimonial
        </p>
      </div>
      <div className="relative flex flex-col lg:flex-row items-center gap-4 xl:gap-[30px] justify-center">
        <div className="relative top-1/2 flex gap-8 flex-col bg-white justify-center cursor-pointer items-center w-2/3 lg:w-1/3 rounded-2xl p-5">
          <div className="absolute w-[40px] h-[40px] bg-testimonyBg rounded-full -left-6 cursor-pointer hidden lg:flex items-center justify-center">
            <img className="" src="prevTestimony.svg" alt="" />
          </div>
          <div>
            <img
              className="w-[60px] md:w-[90px] aspect-square rounded-full"
              src="testimonyphoto.png"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold">Great Platform</h1>
            <p className="text-semiBlackText font-normal text-center">
              When applied to building block a website or similar work product,
              a Visual Guide can be an intermediate step toward the end goal of
              a complete website.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-bold text-footerHeading">Cha Ji-Hun</h1>
            <p>Co-founder of Source DS</p>
          </div>
        </div>
        <div
          style={{
            boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.15)",
          }}
          className="flex cursor-pointer bg-white gap-8 flex-col justify-center items-center w-2/3 lg:w-1/3 rounded-2xl p-5"
        >
          <div>
            <img
              className="w-[60px] md:w-[90px] aspect-square rounded-full"
              src="testimonyphoto.png"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold">Great Platform</h1>
            <p className="text-semiBlackText font-normal text-center">
              When applied to building block a website or similar work product,
              a Visual Guide can be an intermediate step toward the end goal of
              a complete website.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-bold text-footerHeading">Cha Ji-Hun</h1>
            <p>Co-founder of Source DS</p>
          </div>
        </div>
        <div className="relative cursor-pointer top-1/2 flex gap-8 flex-col justify-center bg-white items-center w-2/3 lg:w-1/3 rounded-2xl p-5">
          <div className="absolute w-[40px] h-[40px] bg-testimonyBg rounded-full -right-6 cursor-pointer hidden lg:flex items-center justify-center">
            <img className="" src="nextTestimony.svg" alt="" />
          </div>
          <div>
            <img
              className="w-[60px] md:w-[90px] aspect-square rounded-full"
              src="testimonyphoto.png"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold">Great Platform</h1>
            <p className="text-semiBlackText font-normal text-center">
              When applied to building block a website or similar work product,
              a Visual Guide can be an intermediate step toward the end goal of
              a complete website.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-bold text-footerHeading">Cha Ji-Hun</h1>
            <p>Co-founder of Source DS</p>
          </div>
        </div>
        <div className=" hidden absolute lg:flex items-center justify-center gap-3 -bottom-[55px] transform -tralsate-x-1/2">
          <div className=" cursor-pointer h-4 w-4 rounded-full bg-testimonyBg  "></div>
          <div className="cursor-pointer  h-4 w-10 rounded-full bg-gradient-to-r from-footerHeading to-parrot "></div>
          <div className="cursor-pointer  h-4 w-4 rounded-full bg-testimonyBg  "></div>
          <div className="cursor-pointer  h-4 w-4 rounded-full bg-testimonyBg  "></div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
