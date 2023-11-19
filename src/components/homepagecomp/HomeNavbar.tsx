function HomeNavbar() {
  return (
    <div className="py-5 px-9 flex justify-between items-center">
      <div>
        <img
          src="https://maps.agriplot.earth/assets/logolong-bbde4d32.png"
          alt="mainlogo"
          className="w-20"
        />
      </div>
      <div className="space-x-7">
        <button className="font-semibold text-[#009CA0]">Home</button>
        <button>Feature</button>
        <button>News</button>
        <button>About</button>
        <button>Testimonials</button>
        <button className="bg-[#009CA0] text-white px-5 py-2">Login</button>
      </div>
    </div>
  );
}
export default HomeNavbar;
