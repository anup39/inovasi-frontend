function Footer() {
  return (
    <div className="flex flex-col min-h-[297px] bg-footerBg  text-creamGray py-[10px] middle:py-[20px] px-[20px] md:px-[100px] middle:px-[195px] gap-[30px]">
      <div className="flex flex-col md:flex-row gap-5 justify-between items-start max-w-[1530px]">
        <div className="flex flex-col items-start md:gap-4 gap-0 max-w-[361px]">
          <img
            className="scale-50 md:scale-75 lg:scale-100 w-[170px] h-[64px]"
            src="inovasilogo.svg"
            alt=""
          />
          <p className="font-[500] text-[16px] leading-[19.5px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="flex md:flex-col items-start gap-4  max-w-sm md:max-w-xs">
          <div>
            <p className="text-footerHeading font-semibold">Company</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>About Us</p>
            <p>Features</p>
            <p>Pricing</p>
            <p>Book Demo</p>
          </div>
        </div>
        <div className="flex md:flex-col items-start gap-4 ">
          <div>
            <p className="text-footerHeading font-semibold">Connect</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>LinkedIn</p>
            <p>YouTube</p>
          </div>
        </div>
        <div className="flex md:flex-col items-start gap-4  ">
          <div>
            <p className="text-footerHeading font-semibold">Contact</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>+312345678</p>
            <p>info@mosaix.earth</p>
            <p>Amsterdam, Netherland</p>
          </div>
        </div>
      </div>

      <div className="bg-footerLine h-0.5"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center  md:justify-between">
        <h1 className="font-semibold">© Inovasi Agriplot, 2023 </h1>
        <div className="flex flex-col md:flex-row gap-5">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
