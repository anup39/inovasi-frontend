function Testimonials() {
  return (
    <div className="flex flex-col py-32 px-14 gap-20">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="font-bold text-3xl">People Talk About Us</h1>
        <p className="text-subTextHome font-normal">Testimonial</p>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="flex gap-8 flex-col bg-white justify-center items-center w-1/3 rounded-2xl p-5">
          <div>
            <img
              className="w-[90px] h-[90px] rounded-full"
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
          className="flex bg-white gap-8 flex-col justify-center items-center w-1/3 rounded-2xl p-5"
        >
          <div>
            <img
              className="w-[90px] h-[90px] rounded-full"
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
        <div className="flex gap-8 flex-col justify-center bg-white items-center w-1/3 rounded-2xl p-5">
          <div>
            <img
              className="w-[90px] h-[90px] rounded-full"
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
      </div>
    </div>
  );
}

export default Testimonials;
